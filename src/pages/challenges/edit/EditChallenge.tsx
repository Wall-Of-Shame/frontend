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
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline, pencil } from "ionicons/icons";
import { useState, useReducer } from "react";
import {
  addHours,
  addYears,
  format,
  formatISO,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import "./EditChallenge.scss";
import AddParticipantsModal from "../../../components/participants/AddParticipantsModal";
import { useHistory } from "react-router";
import yoda from "../../../assets/avatar-yoda.png";
import rey from "../../../assets/avatar-rey.png";
import poe from "../../../assets/avatar-poe.png";
import luke from "../../../assets/avatar-luke.png";
import {
  ChallengeData,
  ChallengePost,
  ChallengeType,
  UserMini,
} from "../../../interfaces/models/Challenges";
import { useChallenge } from "../../../contexts/ChallengeContext";
import { UserList } from "../../../interfaces/models/Users";
import { trimDisplayName } from "../../../utils/ProfileUtils";
import EditParticipantsModal from "../../../components/participants/EditParticipantsModal";
import { useUser } from "../../../contexts/UserContext";

interface EditChallengeProps {
  challenge: ChallengeData;
  backAction: () => void;
}

interface EditChallengeState {
  title: string;
  description: string;
  punishmentType: ChallengeType;
  endTime: string;
  participants: {
    accepted: UserMini[];
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
  const history = useHistory();
  const { user } = useUser();
  const { challenge, backAction } = props;
  const { updateChallenge } = useChallenge();
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      endTime: challenge.endAt,
      participants: challenge.participants,
      invitedUsers: challenge.participants.accepted.concat(
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
    if (
      !(
        state.title.length > 0 &&
        state.description.length > 0 &&
        isAfter(parseISO(state.endTime), Date.now())
      )
    ) {
      setHasError(true);
      return;
    }
    const updatedParticipants: string[] = state.invitedUsers.map(
      (u) => u.userId
    );
    const data: ChallengePost = {
      title: state.title,
      description: state.description,
      endAt: state.endTime,
      type: state.punishmentType,
      participants: updatedParticipants,
    };
    setState({ isLoading: true });
    await updateChallenge(data)
      .then(() => {
        window.location.href = `challenges/${challenge.challengeId}/details`;
      })
      .catch((error) => {
        console.log(error);
        setState({ isLoading: false });
      });
  };

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
              Edit challenge
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
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              Who gets thrown onto the wall?
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-bottom ion-padding-horizontal'>
            <IonRadioGroup
              value={state.punishmentType}
              style={{ width: "100%" }}
            >
              <IonRow style={{ marginTop: "0.75rem" }}>
                <IonCol size='10'>
                  <IonLabel>Anyone who doesn't finish in time</IonLabel>
                </IonCol>
                <IonCol size='2'>
                  <IonRow className='ion-justify-content-end'>
                    <IonRadio value='NOT_COMPLETED' mode='md' color='quinary' />
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow style={{ marginTop: "0.75rem" }}>
                <IonCol size='10'>
                  <IonLabel>Last person to complete</IonLabel>
                </IonCol>
                <IonCol size='2'>
                  <IonRow className='ion-justify-content-end'>
                    <IonRadio
                      value='LAST_TO_COMPLETE'
                      mode='md'
                      color='quinary'
                    />
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText
              style={{ fontWeight: "bold" }}
              color={
                hasError && isBefore(parseISO(state.endTime), Date.now())
                  ? "danger"
                  : "primary"
              }
            >
              When does the challenge end?
            </IonText>
          </IonRow>
          <IonList>
            <IonItem lines='none'>
              <IonLabel>End time</IonLabel>
              <IonDatetime
                displayFormat='D MMM YYYY HH:mm'
                min={formatISO(Date.now()).slice(0, -6)}
                max={formatISO(addYears(Date.now(), 10)).slice(0, -6)}
                value={state.endTime}
                placeholder={format(Date.now(), "d MMM yyyy HH:mm")}
                onIonChange={(e) => setState({ endTime: e.detail.value! })}
              ></IonDatetime>
            </IonItem>
          </IonList>
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
            <IonCol size='10'>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                {challenge.participants.accepted.length +
                  challenge.participants.pending.length}{" "}
                participants
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
        <EditParticipantsModal
          accepted={state.participants.accepted}
          pending={state.participants.pending}
          showModal={showModal}
          setShowModal={setShowModal}
          completionCallback={(invitedUsers) => {
            setState({ invitedUsers: invitedUsers });
            setShowModal(false);
          }}
        />
      </IonContent>
      <IonFooter>
        <IonRow className='ion-justify-content-center ion-margin'>
          <IonButton
            shape='round'
            color='secondary'
            fill='solid'
            onClick={handleSubmit}
          >
            <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              Let's geddittt
            </IonText>
          </IonButton>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};

export default EditChallenge;
