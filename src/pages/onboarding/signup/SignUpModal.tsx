import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import "./SignUpModal.css";
import { arrowBackOutline } from "ionicons/icons";

interface SignUpModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = (props: SignUpModalProps) => {
  const { showModal, setShowModal } = props;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
    >
      <IonContent fullscreen>
        <IonRow className='ion-padding' style={{ marginTop: "2rem" }}>
          <IonIcon
            icon={arrowBackOutline}
            size='large'
            onClick={() => setShowModal(false)}
          />
        </IonRow>
        <IonList className='ion-padding-vertical'>
          <IonItem>
            <IonLabel color='primary' position='floating'>
              Username
            </IonLabel>
            <IonInput
              name='name'
              type='text'
              value={username}
              autocapitalize='on'
              required
              onIonChange={(event: CustomEvent) => {
                setUsername(event.detail.value);
              }}
            />
          </IonItem>
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
              autocapitalize='on'
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
        <br />
        <IonButton
          expand='block'
          fill='solid'
          routerLink='signup/verify'
          className='ion-padding-horizontal'
        >
          Next
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default SignUpModal;
