import {
  IonContent,
  IonFab,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
  IonList,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import Container from "../../../components/container";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

interface LoginModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
  const { showModal, setShowModal } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    // API call to login and refresh app
    login(email, password);
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
    >
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
              Log in
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
                value={email}
                autocapitalize='on'
                required
                onIonChange={(event: CustomEvent) => {
                  setEmail(event.detail.value);
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
                value={password}
                required
                onIonChange={(event: CustomEvent) => {
                  setPassword(event.detail.value);
                }}
              />
            </IonItem>
          </IonList>
          <IonButton
            expand='block'
            fill='solid'
            className='ion-padding-horizontal'
            style={{ marginTop: "2rem" }}
            onClick={handleLogin}
            disabled={email === "" || password === ""}
          >
            Let's Go
          </IonButton>
        </Container>
      </IonContent>
    </IonModal>
  );
};

export default LoginModal;
