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
import "./CreateChallenge.scss";
import AddParticipantsModal from "../../../components/participants/AddParticipantsModal";
import { useHistory } from "react-router";
import luke from "../../../assets/avatar-luke.png";
import {
  ChallengePost,
  ChallengeType,
} from "../../../interfaces/models/Challenges";
import { useChallenge } from "../../../contexts/ChallengeContext";
import { UserList } from "../../../interfaces/models/Users";
import { trimDisplayName } from "../../../utils/ProfileUtils";
import { useUser } from "../../../contexts/UserContext";

interface CreateChallengeProps {}

interface CreateChallengeState {
  title: string;
  description: string;
  punishmentType: ChallengeType;
  startAt: string;
  endAt: string;
  invitedUsers: UserList[];
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const CreateChallenge: React.FC<CreateChallengeProps> = (
  props: CreateChallengeProps
) => {
  const { user } = useUser();
  const { createChallenge } = useChallenge();
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [state, setState] = useReducer(
    (s: CreateChallengeState, a: Partial<CreateChallengeState>) => ({
      ...s,
      ...a,
    }),
    {
      title: "",
      description: "",
      punishmentType: "NOT_COMPLETED",
      startAt: formatISO(addHours(Date.now(), 1)),
      endAt: formatISO(addHours(Date.now(), 2)),
      invitedUsers: [],
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
        isAfter(parseISO(state.endAt), Date.now())
      )
    ) {
      setHasError(true);
      return;
    }
    const data: ChallengePost = {
      title: state.title,
      description: state.description,
      startAt: state.startAt,
      endAt: state.endAt,
      type: state.punishmentType,
      participants: state.invitedUsers.map((u) => {
        return u.userId;
      }),
    };
    setState({ isLoading: true });
    await createChallenge(data)
      .then(() => {
        window.location.href = "challenges";
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
              onClick={() => {
                window.location.href = "challenges";
              }}
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
              Create a new challenge
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
                debounce={100}
                placeholder='Enter title*'
                maxlength={50}
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
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
              {`${state.title.length}/50`}
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
          <IonRow className='ion-padding-horizontal'>
            <div
              style={{
                border: "solid 1px #adadad",
                width: "100%",
                borderRadius: "0.5rem",
              }}
            >
              <IonTextarea
                value={state.description}
                debounce={100}
                rows={4}
                maxlength={200}
                placeholder='Enter challenge description*'
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                onIonChange={(event) => {
                  setState({ description: event.detail.value ?? "" });
                }}
              />
            </div>
          </IonRow>
          <IonRow
            className='ion-padding-horizontal ion-justify-content-end'
            style={{ marginTop: "0.5rem" }}
          >
            <IonText style={{ fontSize: "14px", color: "#adadad" }}>
              {`${state.description.length}/200`}
            </IonText>
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
                hasError && isBefore(parseISO(state.endAt), Date.now())
                  ? "danger"
                  : "primary"
              }
            >
              When does the challenge end?
            </IonText>
          </IonRow>
          <IonList>
            <IonItem lines='none'>
              <IonLabel>Start at*</IonLabel>
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
              <IonLabel>End at*</IonLabel>
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
        <IonItemDivider style={{ marginBottom: "0.25rem" }} />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-align-items-center'>
            <IonCol size='10'>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                {state.invitedUsers.length + 1} participant
                {state.invitedUsers.length + 1 !== 1 ? "s" : ""}
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
          <IonList style={{ marginTop: "1rem" }}>
            <IonItem key={user?.userId ?? "owner"} lines='none'>
              <IonAvatar slot='start'>
                <img src={luke} alt='user1' />
              </IonAvatar>
              <IonLabel>You</IonLabel>
            </IonItem>
            {state.invitedUsers.map((u) => {
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
        </IonGrid>
        <AddParticipantsModal
          users={state.invitedUsers}
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

export default CreateChallenge;
