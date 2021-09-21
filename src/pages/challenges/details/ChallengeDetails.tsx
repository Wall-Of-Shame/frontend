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
import { arrowBackOutline, pencil } from "ionicons/icons";
import luke from "../../../assets/avatar-luke.png";
import { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { useChallenge } from "../../../contexts/ChallengeContext";
import { ChallengeData } from "../../../interfaces/models/Challenges";
import "./ChallengeDetails.scss";
import { format, isSameSecond, parseISO } from "date-fns";
import { useUser } from "../../../contexts/UserContext";
import EditChallenge from "../edit";
import { trimDisplayName } from "../../../utils/ProfileUtils";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";
import isAfter from "date-fns/isAfter";
import { intervalToDuration } from "date-fns/esm";
import useInterval from "../../../hooks/useInterval";
import internal from "stream";

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

  const [countdown, setCountdown] = useState<Duration | null>(null);

  const [didFinish, setDidFinish] = useState(false);

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
      const updatedChallenge = await getChallenge(challenge.challengeId);
      if (updatedChallenge) {
        setChallenge(updatedChallenge);
      }
      setState({
        isLoading: false,
        showAlert: true,
        alertHeader: "Woohoo",
        alertMessage: "You have accepted the challenge. ",
      });
    } catch (error) {}
  };

  const handleReject = async () => {
    setState({ isLoading: true });
    try {
      await rejectChallenge(challenge.challengeId);
      setState({ isLoading: false });
      window.location.replace("challenges");
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
      });
    }
  };

  useInterval(() => {
    if (didFinish) {
      return;
    }
    const endAtTime = parseISO(challenge.endAt);
    const duration = intervalToDuration({
      start: Date.now(),
      end: endAtTime,
    });
    if (isAfter(Date.now(), endAtTime)) {
      setDidFinish(true);
      const zeroDuration = intervalToDuration({
        start: Date.now(),
        end: Date.now(),
      });
      setCountdown(zeroDuration);
    } else {
      setCountdown(duration);
    }
  }, 1000);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = () => {
    if (isAfter(Date.now(), parseISO(challenge.endAt!))) {
      return (
        <IonRow className='ion-padding'>
          <IonText>The challenge has ended</IonText>
        </IonRow>
      );
    } else if (isAfter(Date.now(), parseISO(challenge.startAt!))) {
      return (
        <IonRow className='ion-padding'>
          <IonText>Your challenge is</IonText>
        </IonRow>
      );
    } else if (user?.userId === challenge.owner.userId) {
      return (
        <IonRow className='ion-padding'>
          <IonText>You have created a challenge to</IonText>
        </IonRow>
      );
    } else if (
      challenge.participants.accepted.findIndex(
        (p) => p.userId === user?.userId
      ) === -1
    ) {
      return (
        <IonRow className='ion-padding'>
          <IonText>You have been invited to</IonText>
        </IonRow>
      );
    } else {
      return <></>;
    }
  };

  const renderFooter = () => {
    if (isAfter(Date.now(), parseISO(challenge.startAt!))) {
      return (
        <IonRow className='ion-justify-content-around ion-margin'>
          <IonButton
            shape='round'
            color='secondary'
            expand='block'
            fill='solid'
          >
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              I've completed the challenge
            </IonText>
          </IonButton>
        </IonRow>
      );
    } else if (user?.userId === challenge.owner.userId) {
      return (
        <IonRow className='ion-justify-content-center ion-margin'>
          <IonButton shape='round' color='secondary' disabled>
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Waiting for the challenge to start
            </IonText>
          </IonButton>
        </IonRow>
      );
    } else if (
      challenge.participants.accepted.findIndex(
        (p) => p.userId === user?.userId
      ) === -1
    ) {
      return (
        <IonRow className='ion-justify-content-around ion-margin'>
          <IonCol>
            <IonButton
              shape='round'
              color='danger'
              expand='block'
              fill='solid'
              onClick={() => {
                setState({
                  showAlert: true,
                  alertHeader: "Are you sure?",
                  alertMessage:
                    "Once rejected, you will no longer be able to access this challenge 😱",
                  hasConfirm: true,
                  confirmHandler: handleReject,
                });
              }}
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
              onClick={() => {
                setState({
                  showAlert: true,
                  alertHeader: "Are you sure?",
                  alertMessage:
                    "Once accepted, you will need to complete the challenge or get thrown onto the Wall of Shame 🙈",
                  hasConfirm: true,
                  confirmHandler: handleAccept,
                });
              }}
            >
              <IonText>I'm ready!</IonText>
            </IonButton>
          </IonCol>
        </IonRow>
      );
    } else {
      return (
        <IonRow className='ion-justify-content-center ion-margin'>
          <IonButton shape='round' color='secondary' disabled>
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Waiting for the challenge to start
            </IonText>
          </IonButton>
        </IonRow>
      );
    }
  };

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
                history.goBack();
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
                onClick={async () => {
                  setState({ isLoading: true });
                  const updatedChallenge = await getChallenge(
                    challenge.challengeId
                  );
                  if (updatedChallenge) {
                    setChallenge(updatedChallenge);
                    if (updatedChallenge.participants.accepted.length > 1) {
                      setState({
                        isLoading: false,
                        showAlert: true,
                        alertHeader: "Notice",
                        alertMessage:
                          "One or more participants have accepted the challenge, this challenge cannot be edited anymore :)",
                      });
                    } else {
                      setState({ editMode: true, isLoading: false });
                    }
                  }
                }}
              >
                <IonIcon slot='end' icon={pencil} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ marginBottom: "0.5rem" }}>
          {renderHeader()}
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
              This challenge starts at
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>
              {format(parseISO(challenge.startAt!), "EEEE, dd MMM yyyy, HH:mm")}
            </IonText>
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
        {isAfter(Date.now(), parseISO(challenge.startAt!)) && (
          <IonGrid style={{ marginBottom: "0.5rem" }}>
            <IonRow className='ion-padding-horizontal'>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.days ?? "0"}
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.hours ?? "0"}
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.minutes ?? "0"}
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.seconds ?? "0"}
                  </IonText>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonRow className='ion-padding-horizontal ion-padding-bottom'>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>Days</IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>Hours</IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>Minutes</IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>Seconds</IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
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
          {challenge.participants.accepted.length && (
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
          )}
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
          {challenge.participants.pending.length > 0 && (
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
          )}
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
      <IonFooter>{renderFooter()}</IonFooter>
    </IonPage>
  );
};

export default ChallengeDetails;
