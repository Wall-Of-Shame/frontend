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
import { useState } from "react";
import "./SignUpModal.scss";
import { arrowBackOutline } from "ionicons/icons";
import Container from "../../../components/container";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidEmail, isValidPassword } from "../../../utils/ProfileUtils";
import "../../../theme/transitions.scss";

interface PersonalDetailsProps {
  setShowModal: (showModal: boolean) => void;
  nextPage: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = (
  props: PersonalDetailsProps
) => {
  const { setShowModal, nextPage } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const verifyInputs = (): boolean => {
    return true;
    /*
    return (
      isValidEmail(email) &&
      isValidPassword(password) &&
      password === passwordConfirmation
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
          <IonItem>
            <IonLabel color='primary' position='floating'>
              Email
            </IonLabel>
            <IonInput
              name='name'
              type='email'
              value={email}
              autocapitalize='on'
              required
              onIonChange={(event: CustomEvent) => {
                setEmail(event.detail.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel color='primary' position='floating'>
              Password
            </IonLabel>
            <IonInput
              name='name'
              type='password'
              value={password}
              required
              onIonChange={(event: CustomEvent) => {
                setPassword(event.detail.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel color='primary' position='floating'>
              Confirm Password
            </IonLabel>
            <IonInput
              name='name'
              type='password'
              value={passwordConfirmation}
              autocapitalize='on'
              required
              onIonChange={(event: CustomEvent) => {
                setPasswordConfirmation(event.detail.value);
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
