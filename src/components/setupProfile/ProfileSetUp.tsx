import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import "./ProfileSetUpModal.scss";
import Container from "../container";
import "../../theme/transitions.scss";
import { ProfileSetUpModalState } from "./ProfileSetUpModal";
import { closeOutline } from "ionicons/icons";

interface ProfileSetUpProps {
  state: ProfileSetUpModalState;
  setState: React.Dispatch<Partial<ProfileSetUpModalState>>;
  setShowModal: (showModal: boolean) => void;
  completionCallback: () => void;
}

const ProfileSetUp: React.FC<ProfileSetUpProps> = (
  props: ProfileSetUpProps
) => {
  const { state, setState, setShowModal, completionCallback } = props;

  const verifyInputs = (): boolean => {
    // API call to check for uniqueness of username
    return state.displayName.length > 0 && state.username.length > 0;
  };

  return (
    <IonContent fullscreen>
      <IonFab
        horizontal='start'
        vertical='top'
        style={{ marginTop: "1rem", marginLeft: "0.5rem" }}
      >
        <IonIcon
          icon={closeOutline}
          size='large'
          onClick={() => setShowModal(false)}
        />
      </IonFab>
      <Container>
        <IonRow slot='start' className='ion-text-start'>
          <IonText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            Complete your profile set up
          </IonText>
        </IonRow>
        <IonList className='ion-padding-vertical'>
          <IonItem lines='full'>
            <IonLabel color='primary' position='floating'>
              Display name*
            </IonLabel>
            <IonInput
              name='display_name'
              type='text'
              value={state.displayName}
              required
              onIonChange={(event: CustomEvent) => {
                setState({ displayName: event.detail.value });
              }}
            />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel color='primary' position='floating'>
              Username*
            </IonLabel>
            <IonInput
              name='username'
              type='text'
              value={state.username}
              required
              onIonChange={(event: CustomEvent) => {
                setState({ username: event.detail.value });
              }}
            />
          </IonItem>
        </IonList>
        <IonRow slot='start' style={{ textAlign: "left", margin: "1rem" }}>
          <IonText>Your username will allow others to find you easily</IonText>
        </IonRow>
        <IonButton
          expand='block'
          fill='solid'
          shape='round'
          color='secondary'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          disabled={!verifyInputs()}
          onClick={completionCallback}
        >
          Next
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default ProfileSetUp;
