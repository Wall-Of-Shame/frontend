import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline, pencil } from "ionicons/icons";
import { useState, useReducer, useEffect } from "react";
import {
  addYears,
  format,
  formatISO,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import "./EditChallenge.scss";
import {
  ChallengeData,
  ChallengePost,
  ChallengeType,
  UserMini,
} from "../../../interfaces/models/Challenges";
import { useChallenge } from "../../../contexts/ChallengeContext";
import { trimDisplayName } from "../../../utils/ProfileUtils";
import EditParticipantsModal from "../../../components/participants/EditParticipantsModal";
import { useUser } from "../../../contexts/UserContext";
import { hideTabs } from "../../../utils/TabsUtils";
import AvatarImg from "../../../components/avatar";
import OfflineToast from "../../../components/offlineToast";

interface EditChallengeProps {
  challenge: ChallengeData;
  backAction: () => void;
}

interface EditChallengeState {
  title: string;
  description: string;
  punishmentType: ChallengeType;
  startAt: string;
  endAt: string;
  participants: {
    accepted: {
      completed: UserMini[];
      notCompleted: UserMini[];
    };
    pending: UserMini[];
  };
  invitedUsers: UserMini[];
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const EditChallenge: React.FC<EditChallengeProps> = (
  props: EditChallengeProps
) => {
  const { user } = useUser();
  const { challenge, backAction } = props;
  const { updateChallenge } = useChallenge();
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showOfflineToast, setShowOfflineToast] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useReducer(
    (s: EditChallengeState, a: Partial<EditChallengeState>) => ({
      ...s,
      ...a,
    }),
    {
      title: challenge.title,
      description: challenge.description ?? "",
      punishmentType: challenge.type,
      startAt: challenge.startAt ?? formatISO(Date.now()),
      endAt: challenge.endAt,
      participants: challenge.participants,
      invitedUsers: challenge.participants.accepted.notCompleted.concat(
        challenge.participants.pending
      ),
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

  const handleSubmit = async () => {
    const startAtTime = parseISO(state.startAt);
    const endAtTime = parseISO(state.endAt);
    if (
      state.title.length <= 0 ||
      state.description.length <= 0 ||
      isAfter(startAtTime, endAtTime) ||
      isAfter(Date.now(), startAtTime)
    ) {
      console.log("object");
      setHasError(true);
      return;
    }
    const updatedParticipants: string[] = state.invitedUsers.map(
      (u) => u.userId
    );
    const data: ChallengePost = {
      title: state.title,
      description: state.description,
      startAt: state.startAt,
      endAt: state.endAt,
      type: state.punishmentType,
      participants: updatedParticipants,
    };
    setState({ isLoading: true });
    await updateChallenge(challenge.challengeId, data)
      .then(() => {
        setState({ isLoading: false });
        window.location.href = `challenges/${challenge.challengeId}/details`;
      })
      .catch((error) => {
        console.log(error);
        setState({ isLoading: false });
        setShowOfflineToast(true);
      });
  };

  useEffect(() => {
    hideTabs();
  }, []);

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
              onClick={backAction}
            >
              <IonIcon slot='end' icon={arrowBackOutline} size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ marginTop: "0.5rem" }}>
          <IonRow className='ion-padding'>
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Edit your challenge
            </IonText>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding-bottom ion-padding-horizontal'>
            <IonText>
              Anyone who doesn't finish the challenge in time will be thrown to
              the wall
            </IonText>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText
              style={{ fontWeight: "bold" }}
              color={hasError && state.title.length <= 0 ? "danger" : "primary"}
            >
              What's the challenge called?
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal'>
            <div
              style={{
                border: "solid 1px #adadad",
                width: "100%",
                borderRadius: "0.5rem",
              }}
            >
              <IonInput
                value={state.title}
                debounce={300}
                placeholder='Enter title*'
                style={{ marginLeft: "0.5rem", marginRight: "5rem" }}
                onIonChange={(event) => {
                  setState({ title: event.detail.value ?? "" });
                }}
              />
            </div>
          </IonRow>
          <IonRow
            className='ion-padding-horizontal ion-justify-content-end'
            style={{ marginTop: "0.5rem" }}
          >
            <IonText style={{ fontSize: "14px", color: "#adadad" }}>
              {"0/30"}
            </IonText>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText
              style={{ fontWeight: "bold" }}
              color={
                hasError && state.description.length <= 0 ? "danger" : "primary"
              }
            >
              What do they need to do?
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <div
              style={{
                border: "solid 1px #adadad",
                width: "100%",
                borderRadius: "0.5rem",
              }}
            >
              <IonTextarea
                value={state.description}
                debounce={300}
                rows={4}
                placeholder='Enter challenge description*'
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                onIonChange={(event) => {
                  setState({ description: event.detail.value ?? "" });
                }}
              />
            </div>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding'>
            <IonText
              style={{ fontWeight: "bold" }}
              color={
                hasError && isBefore(parseISO(state.endAt), Date.now())
                  ? "danger"
                  : "primary"
              }
            >
              When does the challenge start and end?
            </IonText>
          </IonRow>
          <IonList>
            <IonItem lines='none'>
              <IonLabel>Starts at</IonLabel>
              <IonDatetime
                displayFormat='D MMM YYYY HH:mm'
                min={formatISO(Date.now()).slice(0, -6)}
                max={formatISO(addYears(Date.now(), 10)).slice(0, -6)}
                value={state.startAt}
                placeholder={format(Date.now(), "d MMM yyyy HH:mm")}
                onIonChange={(e) => setState({ startAt: e.detail.value! })}
              ></IonDatetime>
            </IonItem>
            <IonItem lines='none'>
              <IonLabel>Ends at</IonLabel>
              <IonDatetime
                displayFormat='D MMM YYYY HH:mm'
                min={formatISO(Date.now()).slice(0, -6)}
                max={formatISO(addYears(Date.now(), 10)).slice(0, -6)}
                value={state.endAt}
                placeholder={format(Date.now(), "d MMM yyyy HH:mm")}
                onIonChange={(e) => setState({ endAt: e.detail.value! })}
              ></IonDatetime>
            </IonItem>
          </IonList>
          {hasError && isAfter(parseISO(state.startAt), parseISO(state.endAt)) && (
            <IonRow
              className='ion-padding-horizontal'
              style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
            >
              <IonText color='danger'>
                The end time cannot be before start time
              </IonText>
            </IonRow>
          )}
          {hasError && isAfter(Date.now(), parseISO(state.startAt)) && (
            <IonRow
              className='ion-padding-horizontal'
              style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
            >
              <IonText color='danger'>
                The start time cannot be in the past
              </IonText>
            </IonRow>
          )}
        </IonGrid>
        <div
          style={{
            width: "100%",
            height: "0.5rem",
            backgroundColor: "#E5E5E5",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        />
        <IonGrid>
          <IonRow
            className='ion-align-items-center'
            style={{
              marginBottom: "0.5rem",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            <IonCol size='10'>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                Participants
              </IonText>
            </IonCol>
            <IonCol size='2'>
              <IonRow className='ion-justify-content-end'>
                <IonIcon
                  icon={pencil}
                  style={{ fontSize: "1.5rem", padding: "0.25rem" }}
                  onClick={() => setShowModal(true)}
                />
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow
            className='ion-align-items-center'
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          >
            <IonCol>
              <IonText>
                {challenge.participantCount + 1} participant
                {challenge.participantCount + 1 !== 1 ? "s are " : " is "}
                ready to start the challenge
              </IonText>
            </IonCol>
          </IonRow>
          {challenge.participants.accepted.notCompleted.length > 0 && (
            <IonList style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              {challenge.participants.accepted.notCompleted.map((u) => {
                return (
                  <IonItem key={u.userId} lines='none'>
                    <IonAvatar slot='start'>
                      <AvatarImg avatar={u.avatar} />
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
            <>
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

              <IonList style={{ marginTop: "0.5rem" }}>
                {challenge.participants.pending.map((u) => {
                  return (
                    <IonItem key={u.userId} lines='none'>
                      <IonAvatar slot='start'>
                        <AvatarImg avatar={u.avatar} />
                      </IonAvatar>
                      <IonLabel>{trimDisplayName(u.name)}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonList>
            </>
          )}
        </IonGrid>
        <EditParticipantsModal
          accepted={state.participants.accepted.notCompleted}
          pending={state.participants.pending}
          showModal={showModal}
          setShowModal={setShowModal}
          completionCallback={(invitedUsers) => {
            setState({ invitedUsers: invitedUsers });
            setShowModal(false);
          }}
        />
        <OfflineToast
          message='Sorry, we need the internets to edit a challenge :('
          showToast={showOfflineToast}
          setShowToast={setShowOfflineToast}
        />
      </IonContent>
      <IonFooter translucent={true} className='ion-margin-top'>
        <IonToolbar>
          <IonRow
            className='ion-justify-content-center'
            style={{ margin: "0.5rem" }}
          >
            <IonButton
              mode='ios'
              shape='round'
              color='secondary'
              fill='solid'
              onClick={handleSubmit}
            >
              <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Confirm changes
              </IonText>
            </IonButton>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default EditChallenge;
