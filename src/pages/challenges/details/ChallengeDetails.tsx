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
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useReducer, useState } from "react";
import { arrowBackOutline, pencil } from "ionicons/icons";
import luke from "../../../assets/avatar-luke.png";
import { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { useChallenge } from "../../../contexts/ChallengeContext";
import { ChallengeData, UserMini } from "../../../interfaces/models/Challenges";
import "./ChallengeDetails.scss";
import { format, formatISO, parseISO } from "date-fns";
import { useUser } from "../../../contexts/UserContext";
import EditChallenge from "../edit";
import { trimDisplayName } from "../../../utils/ProfileUtils";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";
import isAfter from "date-fns/isAfter";
import { intervalToDuration } from "date-fns/esm";
import useInterval from "../../../hooks/useInterval";
import UploadProofModal from "../proof/upload";
import VoteModal from "../vote";
import ViewProofModal from "../proof/view";
import { hideTabs } from "../../../utils/TabsUtils";
import { database } from "../../../firebase";
import { ref, set } from "firebase/database";
import { VoteData } from "../../../interfaces/models/Votes";
import { RefresherEventDetail } from "@ionic/core";

interface ChallengeDetailsProps {}

interface ChallengeDetailsState {
  editMode: boolean;
  showUploadProofModal: boolean;
  showViewProofModal: boolean;
  userUnderViewing: UserMini | undefined;
  showVoteModal: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
  showToast: boolean;
  toastMessage: string;
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useUser()!;
  const {
    getChallenge,
    acceptChallenge,
    rejectChallenge,
    completeChallenge,
    getVotes,
    releaseResults,
  } = useChallenge();

  const [challenge, setChallenge] = useState<ChallengeData | null>(
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
      showUploadProofModal: false,
      showViewProofModal: false,
      userUnderViewing: undefined,
      showVoteModal: false,
      isLoading: false,
      showAlert: false,
      alertHeader: "",
      alertMessage: "",
      hasConfirm: false,
      confirmHandler: () => {},
      cancelHandler: () => {},
      okHandler: undefined,
      showToast: false,
      toastMessage: "",
    }
  );

  const fetchData = async () => {
    setState({ isLoading: true });
    try {
      const locationState = location.state as ChallengeData;
      if (!locationState) {
        setState({ isLoading: false });
        return;
      }
      const challenge = await getChallenge(locationState.challengeId);
      console.log(challenge);
      if (challenge) {
        setChallenge(challenge);
      }
      setState({ isLoading: false });
    } catch (error) {
      console.log(error);
      setState({
        isLoading: false,
        hasConfirm: false,
        showAlert: true,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
      });
    }
  };

  const handlePublishFailedUsersToFirebase = async (
    usersToShame: UserMini[]
  ): Promise<void> => {
    if (!challenge) {
      return;
    }
    const promises = usersToShame.map((u) => {
      const timestamp = new Date().getTime();
      return new Promise<void>((resolve, reject) => {
        set(ref(database, `shames/${timestamp}+${u.userId}`), {
          name: u.name,
          title: challenge.title,
          time: formatISO(Date.now()),
          timestamp: timestamp,
          avatar: u.avatar,
        })
          .then(() => resolve())
          .catch(() => reject());
      });
    });
    return await Promise.all(promises)
      .then(() => {
        return;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const handlePublishCheatersToFirebase = async (
    usersToShame: VoteData[]
  ): Promise<void> => {
    if (!challenge) {
      return;
    }
    const promises = usersToShame.map((u) => {
      const timestamp = new Date().getTime();
      const victimData = challenge.participants.accepted.completed.find(
        (p) => p.userId === u.victim.userId
      );
      if (!victimData) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve, reject) => {
        set(ref(database, `shames/${timestamp}+${u.victim.userId}`), {
          name: u.victim.name,
          title: challenge.title,
          type: "cheat",
          time: formatISO(Date.now()),
          timestamp: timestamp,
          avatar: victimData.avatar,
        })
          .then(() => resolve())
          .catch(() => reject());
      });
    });
    return await Promise.all(promises)
      .then(() => {
        return;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const handleAccept = async () => {
    if (challenge === null) {
      return;
    }
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
        hasConfirm: false,
        alertHeader: "Woohoo",
        alertMessage: "You have accepted the challenge. ",
      });
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
      });
    }
  };

  const handleReject = async () => {
    if (challenge === null) {
      return;
    }
    setState({ isLoading: true });
    try {
      await rejectChallenge(challenge.challengeId);
      setState({ isLoading: false });
      window.location.replace("challenges");
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
      });
    }
  };

  const handleComplete = async () => {
    if (challenge === null) {
      return;
    }
    setState({ isLoading: true });
    try {
      await completeChallenge(challenge.challengeId);
      const updatedChallenge = await getChallenge(challenge.challengeId);
      if (updatedChallenge) {
        setChallenge(updatedChallenge);
      }
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Woohoo",
        alertMessage:
          "You have completed the challenge. Now chill and watch the rest suffer :)",
      });
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
      });
    }
  };

  const handleReleaseResults = async () => {
    if (challenge === null) {
      return;
    }
    setState({ isLoading: true });
    try {
      const votes = await getVotes(challenge.challengeId);
      const cheaters: VoteData[] = votes.filter((v) => {
        return (
          v.accusers.length >=
          challenge.participants.accepted.completed.concat(
            challenge.participants.accepted.notCompleted
          ).length /
            2
        );
      });
      const cheaterIds = cheaters.map((c) => c.victim.userId);
      await releaseResults(challenge.challengeId, cheaterIds);
      const updatedChallenge = await getChallenge(challenge.challengeId);
      if (updatedChallenge) {
        setChallenge(updatedChallenge);
        await handlePublishFailedUsersToFirebase(
          updatedChallenge.participants.accepted.notCompleted
        );
      } else {
        await handlePublishFailedUsersToFirebase(
          challenge.participants.accepted.notCompleted
        );
      }
      await handlePublishCheatersToFirebase(cheaters);
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Woohoo",
        alertMessage:
          "You have released the results of this challenge. Check out the Wall :)",
      });
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
      });
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (!challenge) {
      event.detail.complete();
      return;
    }
    try {
      const updatedChallenge = await getChallenge(challenge.challengeId);
      if (updatedChallenge) {
        setChallenge(updatedChallenge);
      }
      setTimeout(() => {
        event.detail.complete();
        setState({
          showToast: true,
          toastMessage: "Refreshed successfully",
        });
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        event.detail.complete();
        setState({
          showToast: true,
          toastMessage:
            "Our server is taking a break, come back later please :)",
        });
      }, 2000);
    }
  };

  useInterval(() => {
    if (didFinish) {
      return;
    }
    if (challenge === null) {
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
    hideTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didFinish]);

  const renderParticipants = () => {
    if (challenge === null) {
      return <Redirect to={"challenges"} />;
    }
    if (isAfter(Date.now(), parseISO(challenge.endAt!))) {
      return (
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
                Participants
              </IonText>
            </IonCol>
          </IonRow>
          {challenge.participants.accepted.completed.length > 0 && (
            <IonRow
              className='ion-align-items-center'
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            >
              <IonCol>
                <IonText>
                  {challenge.participants.accepted.completed.length} participant
                  {challenge.participants.accepted.completed.length !== 1
                    ? "s are "
                    : " is "}
                  safe from the Wall of Shame
                </IonText>
              </IonCol>
            </IonRow>
          )}
          {challenge.participants.accepted.completed.length > 0 && (
            <IonList className='ion-margin-vertical'>
              {challenge.participants.accepted.completed.map((u) => {
                return (
                  <IonItem key={u.userId} lines='none'>
                    <IonAvatar slot='start'>
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                    <IonLabel slot='start'>
                      {u.userId === user?.userId
                        ? "You"
                        : trimDisplayName(u.name)}
                    </IonLabel>

                    {u.evidenceLink !== undefined && u.evidenceLink !== "" && (
                      <IonButton
                        slot='end'
                        shape='round'
                        color='tertiary'
                        onClick={() => {
                          setState({
                            userUnderViewing: u,
                            showViewProofModal: true,
                          });
                        }}
                      >
                        &nbsp;View proof&nbsp;
                      </IonButton>
                    )}
                  </IonItem>
                );
              })}
            </IonList>
          )}
          {challenge.participants.accepted.notCompleted.length > 0 && (
            <IonRow
              className='ion-align-items-center'
              style={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            >
              <IonCol>
                {challenge.hasReleasedResult ? (
                  <IonText>
                    {challenge.participants.accepted.notCompleted.length}{" "}
                    participant
                    {challenge.participants.accepted.notCompleted.length !== 1
                      ? "s have "
                      : " has "}
                    been banished to the Wall of Shame :')
                  </IonText>
                ) : (
                  <IonText>
                    {challenge.participants.accepted.notCompleted.length}{" "}
                    participant
                    {challenge.participants.accepted.notCompleted.length !== 1
                      ? "s have "
                      : " has "}
                    failed to complete the challenge on time :')
                  </IonText>
                )}
              </IonCol>
            </IonRow>
          )}
          {challenge.participants.accepted.notCompleted.length > 0 && (
            <IonList className='ion-margin-vertical'>
              {challenge.participants.accepted.notCompleted.map((u) => {
                return (
                  <IonItem key={u.userId} lines='none'>
                    <IonAvatar slot='start'>
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                    <IonLabel>
                      {u.userId === user?.userId
                        ? "You"
                        : trimDisplayName(u.name)}
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          )}
        </IonGrid>
      );
    } else if (isAfter(Date.now(), parseISO(challenge.startAt!))) {
      return (
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
                Participants
              </IonText>
            </IonCol>
          </IonRow>
          {challenge.participants.accepted.completed.length > 0 && (
            <IonRow
              className='ion-align-items-center'
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            >
              <IonCol>
                <IonText>
                  {challenge.participants.accepted.completed.length} participant
                  {challenge.participants.accepted.completed.length !== 1
                    ? "s are "
                    : " is "}
                  safe from the Wall of Shame
                </IonText>
              </IonCol>
            </IonRow>
          )}
          {challenge.participants.accepted.completed.length > 0 && (
            <IonList className='ion-margin-vertical'>
              {challenge.participants.accepted.completed.map((u) => {
                return (
                  <IonItem key={u.userId} lines='none'>
                    <IonAvatar slot='start'>
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                    <IonLabel slot='start'>
                      {u.userId === user?.userId
                        ? "You"
                        : trimDisplayName(u.name)}
                    </IonLabel>
                    {u.evidenceLink !== undefined && u.evidenceLink !== "" && (
                      <IonButton
                        slot='end'
                        shape='round'
                        color='tertiary'
                        onClick={() => {
                          setState({
                            userUnderViewing: u,
                            showViewProofModal: true,
                          });
                        }}
                      >
                        &nbsp;View proof&nbsp;
                      </IonButton>
                    )}
                  </IonItem>
                );
              })}
            </IonList>
          )}
          {challenge.participants.accepted.notCompleted.length > 0 && (
            <IonRow
              className='ion-align-items-center'
              style={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            >
              <IonCol>
                <IonText>
                  {challenge.participants.accepted.notCompleted.length}{" "}
                  participant
                  {challenge.participants.accepted.notCompleted.length !== 1
                    ? "s are "
                    : " is "}
                  are still trying their best
                </IonText>
              </IonCol>
            </IonRow>
          )}
          {challenge.participants.accepted.notCompleted.length > 0 && (
            <IonList className='ion-margin-vertical'>
              {challenge.participants.accepted.notCompleted.map((u) => {
                return (
                  <IonItem key={u.userId} lines='none'>
                    <IonAvatar slot='start'>
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                    <IonLabel>
                      {u.userId === user?.userId
                        ? "You"
                        : trimDisplayName(u.name)}
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          )}
        </IonGrid>
      );
    }
    return (
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
              Participants
            </IonText>
          </IonCol>
        </IonRow>
        {challenge.participants.accepted.notCompleted.length > 0 && (
          <IonRow
            className='ion-align-items-center'
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          >
            <IonCol>
              <IonText>
                {challenge.participants.accepted.notCompleted.length}{" "}
                participant
                {challenge.participants.accepted.notCompleted.length !== 1
                  ? "s are "
                  : " is "}
                ready to start the challenge
              </IonText>
            </IonCol>
          </IonRow>
        )}
        {challenge.participants.accepted.notCompleted.length > 0 && (
          <IonList className='ion-margin-vertical'>
            {challenge.participants.accepted.notCompleted.map((u) => {
              return (
                <IonItem key={u.userId} lines='none'>
                  <IonAvatar slot='start'>
                    <img src={luke} alt='user1' />
                  </IonAvatar>
                  <IonLabel>
                    {u.userId === user?.userId
                      ? "You"
                      : trimDisplayName(u.name)}
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
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
        {challenge.participants.pending.length > 0 && (
          <IonList className='ion-margin-vertical'>
            {challenge.participants.pending.map((u) => {
              return (
                <IonItem key={u.userId} lines='none'>
                  <IonAvatar slot='start'>
                    <img src={luke} alt='user1' />
                  </IonAvatar>
                  <IonLabel slot='start'>
                    {u.userId === user?.userId
                      ? "You"
                      : trimDisplayName(u.name)}
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonGrid>
    );
  };

  const renderHeader = () => {
    if (challenge === null) {
      return <Redirect to={"challenges"} />;
    }

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
      challenge.participants.pending.findIndex(
        (p) => p.userId === user?.userId
      ) !== -1
    ) {
      return (
        <IonRow className='ion-padding'>
          <IonText>You have been invited to</IonText>
        </IonRow>
      );
    }
    return <></>;
  };

  const renderFooter = () => {
    if (challenge === null) {
      return <Redirect to={"challenges"} />;
    }
    if (challenge.hasReleasedResult) {
      return (
        <IonRow className='ion-margin ion-justify-content-center'>
          <IonButton
            shape='round'
            color='secondary'
            expand='block'
            fill='solid'
            onClick={() => setState({ showVoteModal: true })}
          >
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              View voting results
            </IonText>
          </IonButton>
        </IonRow>
      );
    }
    if (isAfter(Date.now(), parseISO(challenge.endAt!))) {
      return (
        <>
          {user?.userId === challenge.owner.userId ? (
            <IonRow className='ion-margin ion-justify-content-around'>
              <IonCol size='6'>
                <IonButton
                  shape='round'
                  color='secondary'
                  expand='block'
                  fill='solid'
                  onClick={() => setState({ showVoteModal: true })}
                >
                  <IonText>Vote out cheaters</IonText>
                </IonButton>
              </IonCol>
              <IonCol size='6'>
                <IonButton
                  shape='round'
                  color='senary'
                  expand='block'
                  fill='solid'
                  onClick={() => {
                    setState({
                      showAlert: true,
                      hasConfirm: true,
                      alertHeader: "Are you sure?",
                      alertMessage:
                        "This will confirm the challenge and voting results and banish those who failed the challenge or cheated to the Wall of Shame :')",
                      confirmHandler: handleReleaseResults,
                    });
                  }}
                >
                  <IonText>Release Results</IonText>
                </IonButton>
              </IonCol>
            </IonRow>
          ) : (
            <IonRow className='ion-margin ion-justify-content-center'>
              <IonButton
                shape='round'
                color='secondary'
                expand='block'
                fill='solid'
                onClick={() => setState({ showVoteModal: true })}
              >
                <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                  Vote out cheaters
                </IonText>
              </IonButton>
            </IonRow>
          )}
        </>
      );
    }
    if (
      challenge.participants.accepted.completed.findIndex(
        (p) => p.userId === user?.userId
      ) !== -1
    ) {
      const viewingUser = challenge.participants.accepted.completed.find(
        (p) => p.userId === user?.userId
      );
      const evidenceLink = viewingUser?.evidenceLink ?? "";
      return (
        <IonRow className='ion-justify-content-around ion-margin'>
          <IonButton
            shape='round'
            color='secondary'
            expand='block'
            fill='solid'
            onClick={() =>
              setState({
                showUploadProofModal: true,
              })
            }
          >
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              {evidenceLink !== "" ? "Re-upload proof" : "Upload proof"}
            </IonText>
          </IonButton>
        </IonRow>
      );
    }

    if (isAfter(Date.now(), parseISO(challenge.startAt!))) {
      return (
        <IonRow className='ion-justify-content-around ion-margin'>
          <IonButton
            shape='round'
            color='secondary'
            expand='block'
            fill='solid'
            onClick={handleComplete}
          >
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              I've completed the challenge
            </IonText>
          </IonButton>
        </IonRow>
      );
    }

    if (user?.userId === challenge.owner.userId) {
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

    if (
      challenge.participants.pending.findIndex(
        (p) => p.userId === user?.userId
      ) !== -1
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
    }

    return (
      <IonRow className='ion-justify-content-center ion-margin'>
        <IonButton shape='round' color='secondary' disabled>
          <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
            Waiting for the challenge to start
          </IonText>
        </IonButton>
      </IonRow>
    );
  };

  if (!(location.state as ChallengeData)) {
    return <Redirect to={"challenges"} />;
  }

  if (challenge === null) {
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
                    if (isAfter(Date.now(), parseISO(updatedChallenge.endAt))) {
                      setState({
                        isLoading: false,
                        showAlert: true,
                        hasConfirm: false,
                        alertHeader: "Notice",
                        alertMessage:
                          "This challenge has already ended, it cannot be edited anymore :)",
                      });
                    } else if (
                      isAfter(Date.now(), parseISO(updatedChallenge.startAt!))
                    ) {
                      setState({
                        isLoading: false,
                        showAlert: true,
                        hasConfirm: false,
                        alertHeader: "Notice",
                        alertMessage:
                          "This challenge has already started, it cannot be edited anymore :)",
                      });
                    } else if (
                      updatedChallenge.participants.accepted.completed.concat(
                        updatedChallenge.participants.accepted.notCompleted
                      ).length > 1
                    ) {
                      setState({
                        isLoading: false,
                        showAlert: true,
                        hasConfirm: false,
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
        <IonRefresher onIonRefresh={handleRefresh} style={{ zIndex: "1000" }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
              Complete the challenge and upload your proof by
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
                    {countdown?.days ?? "-"}
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.hours ?? "-"}
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.minutes ?? "-"}
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol size='3'>
                <IonRow className='ion-justify-content-center'>
                  <IonText style={{ fontWeight: "800", fontSize: "2rem" }}>
                    {countdown?.seconds ?? "-"}
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
        {renderParticipants()}
        <UploadProofModal
          challenge={challenge}
          userData={challenge.participants.accepted.completed.find(
            (p) => p.userId === user?.userId
          )}
          uploadCallback={(data) => setChallenge(data)}
          showModal={state.showUploadProofModal}
          setShowModal={(showModal) =>
            setState({ showUploadProofModal: showModal })
          }
        />
        <ViewProofModal
          userData={state.userUnderViewing}
          showModal={state.showViewProofModal}
          setShowModal={(showModal) =>
            setState({ showViewProofModal: showModal })
          }
        />
        <VoteModal
          showModal={state.showVoteModal}
          setShowModal={(showModal) => setState({ showVoteModal: showModal })}
          challengeId={challenge.challengeId}
          hasReleasedResults={challenge.hasReleasedResult}
          participantsCompleted={challenge.participants.accepted.completed}
          participantsCount={
            challenge.participants.accepted.completed.length +
            challenge.participants.accepted.notCompleted.length
          }
        />
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
        <IonToast
          isOpen={state.showToast}
          onDidDismiss={() => setState({ showToast: false })}
          message={state.toastMessage}
          duration={1500}
        />
      </IonContent>
      <IonFooter>{renderFooter()}</IonFooter>
    </IonPage>
  );
};

export default ChallengeDetails;
