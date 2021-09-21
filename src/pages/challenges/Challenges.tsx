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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import yoda from "../../assets/avatar-yoda.png";
import rey from "../../assets/avatar-rey.png";
import poe from "../../assets/avatar-poe.png";
import luke from "../../assets/avatar-luke.png";
import "./Challenges.scss";
import { useEffect, useReducer, useState } from "react";
import {
  chevronForward,
  addOutline,
  refreshCircle,
  refreshCircleOutline,
  refreshOutline,
} from "ionicons/icons";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import { useHistory, useLocation } from "react-router";
import SetUpProfileModal from "../../components/setupProfile/ProfileSetUpModal";
import { useUser } from "../../contexts/UserContext";
import { useChallenge } from "../../contexts/ChallengeContext";
import { useSelector } from "react-redux";
import { ChallengeData } from "../../interfaces/models/Challenges";
import { RootState } from "../../reducers/RootReducer";
import { ChallengeDux } from "../../reducers/ChallengeDux";
import CreateChallenge from "./create";
import LoadingSpinner from "../../components/loadingSpinner";
import Alert from "../../components/alert";
import { formatDuration, intervalToDuration } from "date-fns";
import parseISO from "date-fns/parseISO";
import { RefresherEventDetail } from "@ionic/core";

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
  const [searchText, setSearchText] = useState("");
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
      setState({ isLoading: false });
      setOngoing(allChallenges.ongoing);
      setPendingStart(allChallenges.pendingStart);
      setPendingResponse(allChallenges.pendingResponse);
    } catch (error) {
      setState({
        isLoading: false,
        alertHeader: "Something went wrong",
        alertMessage: "Please reload and try again later.",
        showAlert: true,
      });
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
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonTitle>Challenges</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense' className='ion-no-border'>
          <IonToolbar>
            <IonTitle size='large'>Challenges</IonTitle>
            <IonButtons slot='end'>
              <IonButton
                style={{
                  marginRight: "1rem",
                }}
                color='dark'
                routerLink='challenges/create'
              >
                <IonIcon slot='end' icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar className='challenges-search'>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              className='ion-margin-top'
            />
          </IonToolbar>
        </IonHeader>

        <IonSegment
          onIonChange={(e) => setTab(e.detail.value ?? "active")}
          value={tab}
          mode='md'
        >
          <IonSegmentButton value='ongoing'>
            <IonLabel>Ongoing</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='pendingStart'>
            <IonLabel>Pending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='pendingResponse'>
            <IonLabel>Invitations</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {(!user?.username || !user?.name) && (
          <IonButton
            expand='block'
            color='quinary'
            shape='round'
            onClick={() => setShowModal(true)}
            style={{ margin: "1.5rem" }}
          >
            Set up profile
          </IonButton>
        )}
        {tab === "ongoing" ? (
          <>
            {ongoing?.map((c) => {
              return (
                <IonCard
                  button
                  key={c.challengeId}
                  onClick={() => {
                    history.push(`challenges/${c.challengeId}/details`, c);
                  }}
                >
                  <IonGrid className='ion-no-padding'>
                    <IonRow className='ion-align-items-center'>
                      <IonCol size='11'>
                        <IonCardHeader
                          className='ion-no-padding ion-padding-top ion-padding-horizontal'
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
                              {`Ends in: ${formatDuration(
                                intervalToDuration({
                                  start: Date.now(),
                                  end: parseISO(c.endAt),
                                })
                              )}`}
                            </IonText>
                          </IonRow>
                          <IonRow>
                            <IonText style={{ fontSize: "0.8rem" }}>
                              {c.participants.accepted.length +
                                c.participants.pending.length}{" "}
                              participants
                            </IonText>
                          </IonRow>
                          <IonRow
                            style={{ paddingTop: "0.5rem" }}
                            className='ion-align-items-center'
                          >
                            {c.participants.accepted.map((p) => {
                              return (
                                <IonAvatar
                                  className='avatar'
                                  key={p.userId}
                                  style={{ marginRight: "0.25rem" }}
                                >
                                  <img src={luke} alt='user1' />
                                </IonAvatar>
                              );
                            })}
                            {c.participants.pending.map((p) => {
                              return (
                                <IonAvatar
                                  className='avatar'
                                  key={p.userId}
                                  style={{ marginRight: "0.25rem" }}
                                >
                                  <img src={luke} alt='user1' />
                                </IonAvatar>
                              );
                            })}
                          </IonRow>
                        </IonCardContent>
                      </IonCol>
                      <IonCol size='1'>
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
        ) : tab === "pendingStart" ? (
          <>
            {pendingStart?.map((c) => {
              return (
                <IonCard
                  button
                  key={c.challengeId}
                  onClick={() => {
                    history.push(`challenges/${c.challengeId}/details`, c);
                  }}
                >
                  <IonGrid className='ion-no-padding'>
                    <IonRow className='ion-align-items-center'>
                      <IonCol size='11'>
                        <IonCardHeader
                          className='ion-no-padding ion-padding-top ion-padding-horizontal'
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
                              Waiting for the host to start
                            </IonText>
                          </IonRow>
                          <IonRow>
                            <IonText style={{ fontSize: "0.8rem" }}>
                              {c.participantCount} participants
                            </IonText>
                          </IonRow>
                          <IonRow
                            style={{ paddingTop: "0.5rem" }}
                            className='ion-align-items-center'
                          >
                            {c.participants.accepted.map((p) => {
                              return (
                                <IonAvatar
                                  className='avatar'
                                  key={p.userId}
                                  style={{ marginRight: "0.25rem" }}
                                >
                                  <img src={luke} alt='user1' />
                                </IonAvatar>
                              );
                            })}
                          </IonRow>
                        </IonCardContent>
                      </IonCol>
                      <IonCol size='1'>
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
        ) : (
          <>
            {pendingResponse?.map((c) => {
              return (
                <IonCard
                  button
                  key={c.challengeId}
                  onClick={() => {
                    history.push(`challenges/${c.challengeId}/details`, c);
                  }}
                >
                  <IonGrid className='ion-no-padding'>
                    <IonRow className='ion-align-items-center'>
                      <IonCol size='11'>
                        <IonCardHeader
                          className='ion-no-padding ion-padding-top ion-padding-horizontal'
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
                              Waiting for the host to start
                            </IonText>
                          </IonRow>
                          <IonRow>
                            <IonText style={{ fontSize: "0.8rem" }}>
                              {c.participantCount} participants
                            </IonText>
                          </IonRow>
                          <IonRow
                            style={{ paddingTop: "0.5rem" }}
                            className='ion-align-items-center'
                          >
                            {c.participants.accepted.map((p) => {
                              return (
                                <IonAvatar
                                  className='avatar'
                                  key={p.userId}
                                  style={{ marginRight: "0.25rem" }}
                                >
                                  <img src={luke} alt='user1' />
                                </IonAvatar>
                              );
                            })}
                          </IonRow>
                        </IonCardContent>
                      </IonCol>
                      <IonCol size='1'>
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
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton color='senary'>
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
