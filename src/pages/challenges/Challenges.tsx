import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Challenges.scss";
import { useEffect, useReducer, useState } from "react";
import { chevronForward, addOutline, refreshOutline } from "ionicons/icons";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import { useHistory, useLocation } from "react-router";
import SetUpProfileModal from "../../components/setupProfile/ProfileSetUpModal";
import { useUser } from "../../contexts/UserContext";
import { useChallenge } from "../../contexts/ChallengeContext";
import { useSelector } from "react-redux";
import { ChallengeData } from "../../interfaces/models/Challenges";
import { RootState } from "../../reducers/RootReducer";
import { ChallengeDux } from "../../reducers/ChallengeDux";
import LoadingSpinner from "../../components/loadingSpinner";
import Alert from "../../components/alert";
import { format, formatDuration, intervalToDuration } from "date-fns";
import parseISO from "date-fns/parseISO";
import AvatarImg from "../../components/avatar";

interface ChallengesState {
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const Challenges: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const history = useHistory();
  const { getAllChallenges } = useChallenge();
  const selectChallenges = (state: RootState): ChallengeDux => state.challenges;

  const [tab, setTab] = useState("ongoing");
  const [showModal, setShowModal] = useState(false);

  const [ongoing, setOngoing] = useState<ChallengeData[]>(
    useSelector(selectChallenges).ongoing
  );

  const [pendingResponse, setPendingResponse] = useState<ChallengeData[]>(
    useSelector(selectChallenges).pendingResponse
  );

  const [pendingStart, setPendingStart] = useState<ChallengeData[]>(
    useSelector(selectChallenges).pendingStart
  );

  const [completed, setCompleted] = useState<ChallengeData[]>(
    useSelector(selectChallenges).history
  );

  const [state, setState] = useReducer(
    (s: ChallengesState, a: Partial<ChallengesState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: false,
      showAlert: false,
      alertHeader: "",
      alertMessage: "",
      hasConfirm: false,
      confirmHandler: () => {},
      cancelHandler: () => {},
      okHandler: undefined,
    }
  );

  useEffect(() => {
    if (
      location.pathname === "/challenges" ||
      location.pathname === "/wall-of-shame" ||
      location.pathname === "/profile"
    ) {
      showTabs();
    } else {
      hideTabs();
    }
  }, [location.pathname]);

  const fetchData = async () => {
    setState({ isLoading: true });
    try {
      const allChallenges = await getAllChallenges();
      console.log(allChallenges);

      setOngoing(allChallenges.ongoing);
      setPendingStart(allChallenges.pendingStart);
      setPendingResponse(allChallenges.pendingResponse);
      setCompleted(allChallenges.history);
      setTimeout(() => {
        setState({ isLoading: false });
      }, 500);
    } catch (error) {
      setTimeout(() => {
        setState({
          isLoading: false,
          alertHeader: "Something went wrong",
          alertMessage: "Please reload and try again later.",
          showAlert: true,
        });
      }, 500);
    }
  };

  const renderChallenges = () => {
    switch (tab) {
      case "ongoing":
        if (ongoing && ongoing.length > 0) {
          return (
            <>
              {ongoing?.map((c) => {
                const acceptedCount = c.participants.accepted.completed.concat(
                  c.participants.accepted.notCompleted
                ).length;
                return (
                  <IonCard
                    button
                    key={c.challengeId}
                    onClick={() => {
                      history.push(`challenges/${c.challengeId}/details`, c);
                    }}
                  >
                    <IonGrid className="ion-no-padding">
                      <IonRow className="ion-align-items-center">
                        <IonCol size="11">
                          <IonCardHeader style={{ paddingBottom: "0.75rem" }}>
                            <IonCardTitle style={{ fontSize: "1.2rem" }}>
                              {c.title}
                            </IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent>
                            <IonRow>
                              <IonText
                                style={{
                                  fontSize: "0.8rem",
                                  fontWeight: "bold",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                {`Ends in: ${formatDuration(
                                  intervalToDuration({
                                    start: Date.now(),
                                    end: parseISO(c.endAt),
                                  })
                                )}`}
                              </IonText>
                            </IonRow>
                            <IonRow style={{ marginTop: "0.5rem" }}>
                              <IonText style={{ fontSize: "0.8rem" }}>
                                {acceptedCount} participant
                                {acceptedCount === 1 ? "" : "s"}
                              </IonText>
                            </IonRow>
                            <IonRow
                              style={{ paddingTop: "0.5rem" }}
                              className="ion-align-items-center"
                            >
                              {c.participants.accepted.completed
                                .concat(c.participants.accepted.notCompleted)
                                .map((p) => {
                                  return (
                                    <IonAvatar
                                      className="avatar"
                                      key={p.userId}
                                      style={{ marginRight: "0.25rem" }}
                                    >
                                      <AvatarImg avatar={p.avatar} />
                                    </IonAvatar>
                                  );
                                })}
                              {c.participants.pending.map((p) => {
                                return (
                                  <IonAvatar
                                    className="avatar"
                                    key={p.userId}
                                    style={{ marginRight: "0.25rem" }}
                                  >
                                    <AvatarImg avatar={p.avatar} />
                                  </IonAvatar>
                                );
                              })}
                            </IonRow>
                          </IonCardContent>
                        </IonCol>
                        <IonCol size="1">
                          <IonIcon
                            icon={chevronForward}
                            style={{ fontSize: "1.5rem" }}
                          />
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCard>
                );
              })}
            </>
          );
        } else {
          return (
            <IonGrid
              style={{
                display: "flex",
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonRow className="ion-padding">No challenges yet</IonRow>
            </IonGrid>
          );
        }
      case "pending":
        if (
          (pendingResponse && pendingResponse.length > 0) ||
          (pendingStart && pendingStart.length > 0)
        ) {
          return (
            <>
              {pendingResponse.length > 0 && (
                <>
                  <IonRow className="ion-padding-horizontal ion-margin-top">
                    <IonText style={{ color: "gray" }}>
                      Pending Invitations
                    </IonText>
                  </IonRow>
                  {pendingResponse?.map((c) => {
                    const acceptedCount =
                      c.participants.accepted.completed.concat(
                        c.participants.accepted.notCompleted
                      ).length;
                    return (
                      <IonCard
                        button
                        key={c.challengeId}
                        onClick={() => {
                          history.push(
                            `challenges/${c.challengeId}/details`,
                            c
                          );
                        }}
                      >
                        <IonGrid className="ion-no-padding">
                          <IonRow className="ion-align-items-center">
                            <IonCol size="11">
                              <IonCardHeader
                                style={{ paddingBottom: "0.75rem" }}
                              >
                                <IonCardTitle style={{ fontSize: "1.2rem" }}>
                                  {c.title}
                                </IonCardTitle>
                              </IonCardHeader>
                              <IonCardContent>
                                <IonRow>
                                  <IonText
                                    style={{
                                      fontSize: "0.8rem",
                                      fontWeight: "bold",
                                      marginBottom: "0.25rem",
                                    }}
                                  >
                                    Waiting for your response
                                  </IonText>
                                </IonRow>
                                <IonRow style={{ marginTop: "0.5rem" }}>
                                  <IonText style={{ fontSize: "0.8rem" }}>
                                    {acceptedCount} participant
                                    {acceptedCount === 1 ? "" : "s"}
                                  </IonText>
                                </IonRow>
                                <IonRow
                                  style={{ paddingTop: "0.5rem" }}
                                  className="ion-align-items-center"
                                >
                                  {c.participants.accepted.completed
                                    .concat(
                                      c.participants.accepted.notCompleted
                                    )
                                    .map((p) => {
                                      return (
                                        <IonAvatar
                                          className="avatar"
                                          key={p.userId}
                                          style={{ marginRight: "0.25rem" }}
                                        >
                                          <AvatarImg avatar={p.avatar} />
                                        </IonAvatar>
                                      );
                                    })}
                                </IonRow>
                              </IonCardContent>
                            </IonCol>
                            <IonCol size="1">
                              <IonIcon
                                icon={chevronForward}
                                style={{ fontSize: "1.5rem" }}
                              />
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCard>
                    );
                  })}
                </>
              )}
              {pendingStart.length > 0 && (
                <>
                  <IonRow className="ion-padding-horizontal ion-margin-top">
                    <IonText style={{ color: "grey" }}>
                      Waiting to start
                    </IonText>
                  </IonRow>

                  {pendingStart?.map((c) => {
                    const acceptedCount =
                      c.participants.accepted.completed.concat(
                        c.participants.accepted.notCompleted
                      ).length;
                    return (
                      <IonCard
                        button
                        key={c.challengeId}
                        onClick={() => {
                          history.push(
                            `challenges/${c.challengeId}/details`,
                            c
                          );
                        }}
                      >
                        <IonGrid className="ion-no-padding">
                          <IonRow className="ion-align-items-center">
                            <IonCol size="11">
                              <IonCardHeader
                                style={{ paddingBottom: "0.75rem" }}
                              >
                                <IonCardTitle style={{ fontSize: "1.2rem" }}>
                                  {c.title}
                                </IonCardTitle>
                              </IonCardHeader>
                              <IonCardContent>
                                <IonRow>
                                  <IonText
                                    style={{
                                      fontSize: "0.8rem",
                                      fontWeight: "bold",
                                      marginBottom: "0.25rem",
                                    }}
                                  >
                                    {`Starts on ${format(
                                      parseISO(c.startAt!),
                                      "dd MMM yyyy, HH:mm"
                                    )}`}
                                  </IonText>
                                </IonRow>
                                <IonRow style={{ marginTop: "0.5rem" }}>
                                  <IonText style={{ fontSize: "0.8rem" }}>
                                    {acceptedCount} participant
                                    {acceptedCount === 1 ? "" : "s"} have
                                    accepted
                                  </IonText>
                                </IonRow>
                                <IonRow
                                  style={{ paddingTop: "0.5rem" }}
                                  className="ion-align-items-center"
                                >
                                  {c.participants.accepted.completed
                                    .concat(
                                      c.participants.accepted.notCompleted
                                    )
                                    .map((p) => {
                                      return (
                                        <IonAvatar
                                          className="avatar"
                                          key={p.userId}
                                          style={{ marginRight: "0.25rem" }}
                                        >
                                          <AvatarImg avatar={p.avatar} />
                                        </IonAvatar>
                                      );
                                    })}
                                </IonRow>
                              </IonCardContent>
                            </IonCol>
                            <IonCol size="1">
                              <IonIcon
                                icon={chevronForward}
                                style={{ fontSize: "24px" }}
                              />
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCard>
                    );
                  })}
                </>
              )}
            </>
          );
        } else {
          return (
            <IonGrid
              style={{
                display: "flex",
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonRow className="ion-padding">No challenges yet</IonRow>
            </IonGrid>
          );
        }
      case "history":
        if (completed && completed.length > 0) {
          return (
            <>
              {completed?.map((c) => {
                const acceptedCount = c.participants.accepted.completed.concat(
                  c.participants.accepted.notCompleted
                ).length;
                return (
                  <IonCard
                    button
                    key={c.challengeId}
                    onClick={() => {
                      history.push(`challenges/${c.challengeId}/details`, c);
                    }}
                  >
                    <IonGrid className="ion-no-padding">
                      <IonRow className="ion-align-items-center">
                        <IonCol size="11">
                          <IonCardHeader style={{ paddingBottom: "0.75rem" }}>
                            <IonRow>
                              <IonCardTitle style={{ fontSize: "1.2rem" }}>
                                {c.title}
                              </IonCardTitle>
                            </IonRow>
                          </IonCardHeader>
                          <IonCardContent>
                            <IonRow>
                              <IonText
                                style={{
                                  fontSize: "0.8rem",
                                  fontWeight: "bold",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                {`Ended on ${format(
                                  parseISO(c.endAt),
                                  "dd MMM yyyy, HH:mm"
                                )}`}
                              </IonText>
                            </IonRow>
                            <IonRow style={{ marginTop: "0.5rem" }}>
                              <IonText style={{ fontSize: "0.8rem" }}>
                                {acceptedCount} participant
                                {acceptedCount === 1 ? "" : "s"}
                              </IonText>
                            </IonRow>
                            <IonRow
                              style={{ paddingTop: "0.5rem" }}
                              className="ion-align-items-center"
                            >
                              {c.participants.accepted.completed
                                .concat(c.participants.accepted.notCompleted)
                                .map((p) => {
                                  return (
                                    <IonAvatar
                                      className="avatar"
                                      key={p.userId}
                                      style={{ marginRight: "0.25rem" }}
                                    >
                                      <AvatarImg avatar={p.avatar} />
                                    </IonAvatar>
                                  );
                                })}
                              {c.participants.pending.map((p) => {
                                return (
                                  <IonAvatar
                                    className="avatar"
                                    key={p.userId}
                                    style={{ marginRight: "0.25rem" }}
                                  >
                                    <AvatarImg avatar={p.avatar} />
                                  </IonAvatar>
                                );
                              })}
                            </IonRow>
                          </IonCardContent>
                        </IonCol>
                        <IonCol size="1">
                          <IonIcon
                            icon={chevronForward}
                            style={{ fontSize: "1.5rem" }}
                          />
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCard>
                );
              })}
            </>
          );
        } else {
          return (
            <IonGrid
              style={{
                display: "flex",
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonRow className="ion-padding">No challenges yet</IonRow>
            </IonGrid>
          );
        }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!user?.username || !user?.name) {
        setShowModal(true);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Challenges</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar>
            <IonTitle size="large">Challenges</IonTitle>
            <IonButtons slot="end">
              <IonButton
                style={{
                  marginRight: "1rem",
                }}
                color="dark"
                routerLink="challenges/create"
              >
                <IonIcon slot="end" icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonSegment
          onIonChange={(e) => setTab(e.detail.value ?? "active")}
          value={tab}
          mode="md"
          style={{ marginTop: "1rem" }}
        >
          <IonSegmentButton value="ongoing">
            <IonLabel>Ongoing</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pending">
            <IonLabel>Pending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>History</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {renderChallenges()}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="senary" onClick={fetchData}>
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
        <SetUpProfileModal showModal={showModal} setShowModal={setShowModal} />
        <LoadingSpinner
          loading={state.isLoading}
          message={"Loading"}
          closeLoading={() => {}}
        />
        <Alert
          showAlert={state.showAlert}
          closeAlert={(): void => {
            setState({
              showAlert: false,
            });
          }}
          alertHeader={state.alertHeader}
          alertMessage={state.alertMessage}
          hasConfirm={state.hasConfirm}
          confirmHandler={state.confirmHandler}
          cancelHandler={state.cancelHandler}
          okHandler={state.okHandler}
        />
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
