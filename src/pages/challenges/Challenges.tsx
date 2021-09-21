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
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
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
import { chevronForward, addOutline } from "ionicons/icons";
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

interface ChallengesState {
  isCreateMode: boolean;
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

  const [ongoingChallenges, setOngoingChallenges] = useState<ChallengeData[]>(
    useSelector(selectChallenges).ongoingChallenges
  );

  const [pendingChallenges, setPendingChallenges] = useState<ChallengeData[]>(
    useSelector(selectChallenges).pendingChallenges
  );

  const [state, setState] = useReducer(
    (s: ChallengesState, a: Partial<ChallengesState>) => ({
      ...s,
      ...a,
    }),
    {
      isCreateMode: false,
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
      setOngoingChallenges(allChallenges.ongoing);
      setPendingChallenges(allChallenges.pending);
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

  if (state.isCreateMode) {
    return (
      <CreateChallenge
        completionCallback={async () => {
          setState({ isCreateMode: false });
          await fetchData();
        }}
        cancelCallback={() => setState({ isCreateMode: false })}
      />
    );
  }

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
                onClick={() => setState({ isCreateMode: true })}
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
          <IonSegmentButton value='pending'>
            <IonLabel>Pending</IonLabel>
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
            {ongoingChallenges.map((c) => {
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
                              Ends in: 1 day 4 hours
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
            {pendingChallenges.map((c) => {
              return (
                <IonCard
                  button
                  key={c.challengeId}
                  onClick={() => {
                    history.push(`challenges/${c.challengeId}/details`);
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
                              Ends in: 1 day 4 hours
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
                            <IonAvatar
                              className='avatar'
                              style={{ marginRight: "0.25rem" }}
                            >
                              <img src={luke} alt='user1' />
                            </IonAvatar>
                            <IonAvatar
                              className='avatar'
                              style={{ marginRight: "0.25rem" }}
                            >
                              <img src={yoda} alt='user2' />
                            </IonAvatar>
                            <IonAvatar
                              className='avatar'
                              style={{ marginRight: "0.25rem" }}
                            >
                              <img src={poe} alt='user3' />
                            </IonAvatar>
                            <IonAvatar
                              className='avatar'
                              style={{ marginRight: "0.25rem" }}
                            >
                              <img src={rey} alt='user4' />
                            </IonAvatar>
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
