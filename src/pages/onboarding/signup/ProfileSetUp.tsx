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
import "./SignUpModal.scss";
import { arrowBackOutline } from "ionicons/icons";
import Container from "../../../components/container";
import "../../../theme/transitions.scss";
import { SignUpModalState } from "./SignUpModal";

interface PersonalDetailsProps {
  state: SignUpModalState;
  setState: React.Dispatch<Partial<SignUpModalState>>;
  completionCallback: () => void;
  prevPage: () => void;
}

const ProfileSetUp: React.FC<PersonalDetailsProps> = (
  props: PersonalDetailsProps
) => {
  const { state, setState, prevPage, completionCallback } = props;

  const verifyInputs = (): boolean => {
    // API call to check for uniqueness of username
    return state.displayName.length > 0 && state.username.length > 0;
  };

  return (
    <IonContent fullscreen>
      <IonFab horizontal='start' vertical='top' style={{ marginTop: "1rem" }}>
        <IonIcon icon={arrowBackOutline} size='large' onClick={prevPage} />
      </IonFab>
      <Container>
        <IonRow slot='start'>
          <IonText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
          >
            Set up your profile
          </IonText>
        </IonRow>
        <IonList className='ion-padding-vertical'>
          <IonItem>
            <IonLabel color='primary' position='floating'>
              Display name
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
          <IonItem>
            <IonLabel color='primary' position='floating'>
              Username
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
        <IonButton
          expand='block'
          fill='solid'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          disabled={false && !verifyInputs()}
          onClick={completionCallback}
        >
          Get Started
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default ProfileSetUp;
