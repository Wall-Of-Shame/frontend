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
import { addOutline, arrowBackOutline, pencil } from "ionicons/icons";
import { useReducer } from "react";
import { addYears, format, formatISO } from "date-fns";
import "./CreateChallenge.scss";
import { useHistory } from "react-router";
import yoda from "../../../assets/avatar-yoda.png";
import rey from "../../../assets/avatar-rey.png";
import poe from "../../../assets/avatar-poe.png";
import luke from "../../../assets/avatar-luke.png";

interface CreateChallengeProps {}

interface CreateChallengeState {
  title: string;
  description: string;
  punishmentType: "last" | "fail";
  endTime: string;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const CreateChallenge: React.FC<CreateChallengeProps> = () => {
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useReducer(
    (s: CreateChallengeState, a: Partial<CreateChallengeState>) => ({
      ...s,
      ...a,
    }),
    {
      title: "",
      description: "",
      punishmentType: "fail",
      endTime: Date.now().toString(),
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
              onClick={() => history.goBack()}
            >
              <IonIcon slot='end' icon={arrowBackOutline} size='large' />
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color='dark'
            >
              <IonIcon slot='end' icon={pencil} />
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
            <IonText style={{ fontWeight: "bold" }}>
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
                placeholder='Enter title'
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
              {"0/30"}
            </IonText>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
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
                placeholder='Enter challenge description'
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
                    <IonRadio value='fail' mode='md' color='quinary' />
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow style={{ marginTop: "0.75rem" }}>
                <IonCol size='10'>
                  <IonLabel>Last person to complete</IonLabel>
                </IonCol>
                <IonCol size='2'>
                  <IonRow className='ion-justify-content-end'>
                    <IonRadio value='last' mode='md' color='quinary' />
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
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
          <IonRow className='ion-padding-horizontal ion-align-items-center'>
            <IonCol size='10'>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                8 participants
              </IonText>
            </IonCol>
            <IonCol size='2'>
              <IonRow className='ion-justify-content-end'>
                <IonIcon
                  icon={addOutline}
                  style={{ fontSize: "1.5rem", padding: "0.25rem" }}
                />
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className='ion-align-items-center'>
            <IonAvatar
              className='user-avatar'
              style={{ marginRight: "0.25rem" }}
            >
              <img src={luke} alt='user1' />
            </IonAvatar>
            <IonAvatar
              className='user-avatar'
              style={{ marginRight: "0.25rem" }}
            >
              <img src={yoda} alt='user2' />
            </IonAvatar>
            <IonAvatar
              className='user-avatar'
              style={{ marginRight: "0.25rem" }}
            >
              <img src={poe} alt='user3' />
            </IonAvatar>
            <IonAvatar
              className='user-avatar'
              style={{ marginRight: "0.25rem" }}
            >
              <img src={rey} alt='user4' />
            </IonAvatar>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonRow className='ion-justify-content-center ion-margin'>
          <IonButton shape='round' color='secondary' fill='solid'>
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
