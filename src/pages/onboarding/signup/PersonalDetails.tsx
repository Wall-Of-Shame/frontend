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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidEmail, isValidPassword } from "../../../utils/ProfileUtils";
import "../../../theme/transitions.scss";
import { SignUpModalState } from "./SignUpModal";

interface PersonalDetailsProps {
  state: SignUpModalState;
  setState: React.Dispatch<Partial<SignUpModalState>>;
  setShowModal: (showModal: boolean) => void;
  nextPage: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = (
  props: PersonalDetailsProps
) => {
  const { state, setState, setShowModal, nextPage } = props;

  const verifyInputs = (): boolean => {
    return true;
    /*
    return (
      isValidEmail(state.email) &&
      isValidPassword(state.password) &&
      state.password === state.passwordConfirmation
    );
    */
  };

  return (
    <IonContent fullscreen>
      <IonFab horizontal='start' vertical='top' style={{ marginTop: "1rem" }}>
        <IonIcon
          icon={arrowBackOutline}
          size='large'
          onClick={() => setShowModal(false)}
        />
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
            Create Account
          </IonText>
        </IonRow>
        <IonList className='ion-padding-vertical'>
          <IonItem lines='full'>
            <IonLabel color='primary' position='floating'>
              Email
            </IonLabel>
            <IonInput
              name='name'
              type='email'
              value={state.email}
              autocapitalize='on'
              required
              onIonChange={(event: CustomEvent) => {
                setState({ email: event.detail.value });
              }}
            />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel color='primary' position='floating'>
              Password
            </IonLabel>
            <IonInput
              name='name'
              type='password'
              value={state.password}
              required
              onIonChange={(event: CustomEvent) => {
                setState({ password: event.detail.value });
              }}
            />
          </IonItem>
          <IonItem lines='full'>
            <IonLabel color='primary' position='floating'>
              Confirm Password
            </IonLabel>
            <IonInput
              name='name'
              type='password'
              value={state.passwordConfirmation}
              autocapitalize='on'
              required
              onIonChange={(event: CustomEvent) => {
                setState({ passwordConfirmation: event.detail.value });
              }}
            />
          </IonItem>
        </IonList>
        <IonButton
          expand='block'
          fill='solid'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          disabled={!verifyInputs()}
          onClick={nextPage}
        >
          Next
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default PersonalDetails;
