import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { useReducer, useState } from "react";
import {
  addOutline,
  arrowBackOutline,
  pencil,
  removeOutline,
} from "ionicons/icons";
import luke from "../../../assets/avatar-luke.png";
import { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { useChallenge } from "../../../contexts/ChallengeContext";
import {
  ChallengeData,
  ChallengeType,
  UserMini,
} from "../../../interfaces/models/Challenges";
import "./ChallengeDetails.scss";
import { addHours, format, formatISO, parseISO } from "date-fns";
import { useUser } from "../../../contexts/UserContext";
import { UserList } from "../../../interfaces/models/Users";
import EditChallenge from "../edit";
import { showTabs } from "../../../utils/TabsUtils";
import { trimDisplayName } from "../../../utils/ProfileUtils";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";

interface ChallengeDetailsProps {}

interface ChallengeDetailsState {
  editMode: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useUser()!;
  const { getChallenge, acceptChallenge, rejectChallenge, completeChallenge } =
    useChallenge();

  const [challenge, setChallenge] = useState<ChallengeData>(
    location.state as ChallengeData
  );

  const [state, setState] = useReducer(
    (s: ChallengeDetailsState, a: Partial<ChallengeDetailsState>) => ({
      ...s,
      ...a,
    }),
    {
      editMode: false,
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

  const fetchData = async () => {
    try {
      const locationState = location.state as ChallengeData;
      if (!locationState) {
        return;
      }
      const challenge = await getChallenge(locationState.challengeId);
      console.log(challenge);
      if (challenge) {
        setChallenge(challenge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    setState({ isLoading: true });
    try {
      await acceptChallenge(challenge.challengeId);
      setState({
        isLoading: false,
        showAlert: true,
        alertHeader: "Woohoo",
        alertMessage: "You have accepted the challenge. ",
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!(location.state as ChallengeData)) {
    return <Redirect to={"challenges"} />;
  }

  if (state.editMode) {
    return (
      <EditChallenge
        challenge={challenge}
        backAction={() => setState({ editMode: false })}
      />
    );
  }

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color='dark'
              onClick={() => {
                window.location.href = "challenges";
              }}
            >
              <IonIcon slot='end' icon={arrowBackOutline} size='large' />
            </IonButton>
          </IonButtons>
          {user?.userId === challenge.owner.userId && (
            <IonButtons slot='end'>
              <IonButton
                style={{
                  marginTop: "1.5rem",
                  marginRight: "1rem",
                }}
                color='dark'
                onClick={() => setState({ editMode: true })}
              >
                <IonIcon slot='end' icon={pencil} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ marginBottom: "0.5rem" }}>
          <IonRow className='ion-padding'>
            <IonText>
              {challenge.owner.userId === user?.userId
                ? "You have created a challenge to"
                : "You have been invited to"}
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              {challenge.title}
            </IonText>
          </IonRow>
        </IonGrid>
        <IonGrid style={{ marginBottom: "0.5rem" }}>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              What do we need to do?
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>{challenge.description}</IonText>
          </IonRow>
        </IonGrid>
        <IonGrid style={{ marginBottom: "0.5rem" }}>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              Complete the challenge by
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>
              {format(parseISO(challenge.endAt), "EEEE, dd MMM yyyy, HH:mm")}
            </IonText>
          </IonRow>
        </IonGrid>
        <IonItemDivider style={{ marginBottom: "0.25rem" }} />
        <IonGrid>
          <IonRow
            className='ion-align-items-center'
            style={{
              marginBottom: "0.5rem",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            <IonCol>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                {challenge.participants.accepted.length +
                  challenge.participants.pending.length}{" "}
                participants
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow
            className='ion-align-items-center'
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          >
            <IonCol>
              <IonText>
                {challenge.participants.accepted.length} participant
                {challenge.participants.accepted.length !== 1
                  ? "s are "
                  : " is "}
                ready to start the challenge
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className='ion-align-items-center'>
            {challenge.participants.accepted.map((u) => {
              return (
                <div key={u.userId} style={{ margin: "0.5rem" }}>
                  <IonRow className='ion-justify-content-center'>
                    <IonAvatar className='user-avatar'>
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                  </IonRow>
                  <IonRow
                    className='ion-justify-content-center'
                    style={{ marginTop: "0.25rem" }}
                  >
                    <IonText style={{ fontSize: "0.7rem" }}>
                      {u.userId === user?.userId
                        ? "You"
                        : trimDisplayName(u.name)}
                    </IonText>
                  </IonRow>
                </div>
              );
            })}
          </IonRow>
          <IonRow
            className='ion-align-items-center'
            style={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            <IonCol>
              <IonText>
                {challenge.participants.pending.length} burden
                {challenge.participants.pending.length !== 1
                  ? "s are "
                  : " is "}
                still questioning life
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className='ion-align-items-center'>
            {challenge.participants.pending.map((u) => {
              return (
                <div key={u.userId} style={{ margin: "0.5rem" }}>
                  <IonRow className='ion-justify-content-center'>
                    <IonAvatar className='user-avatar'>
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                  </IonRow>
                  <IonRow
                    className='ion-justify-content-center'
                    style={{ marginTop: "0.25rem" }}
                  >
                    <IonText style={{ fontSize: "0.7rem" }}>
                      {trimDisplayName(u.name)}
                    </IonText>
                  </IonRow>
                </div>
              );
            })}
          </IonRow>
        </IonGrid>
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
      <IonFooter>
        {user?.userId === challenge.owner.userId ? (
          <IonRow className='ion-justify-content-center'>
            <IonButton shape='round' color='secondary'>
              <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Start
              </IonText>
            </IonButton>
          </IonRow>
        ) : (
          <IonRow className='ion-justify-content-around'>
            <IonCol>
              <IonButton
                shape='round'
                color='danger'
                expand='block'
                fill='solid'
              >
                <IonText>Nope</IonText>
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                shape='round'
                color='secondary'
                fill='solid'
                expand='block'
                style={{ marginBottom: "0.5rem" }}
              >
                <IonText>I'm ready!</IonText>
              </IonButton>
            </IonCol>
          </IonRow>
        )}
      </IonFooter>
    </IonPage>
  );
};

export default ChallengeDetails;
