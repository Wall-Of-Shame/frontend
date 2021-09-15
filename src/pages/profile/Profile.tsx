import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Container from "../../components/container/Container";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { logout } = useAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Container>
          <IonButton
            expand='block'
            onClick={() => {
              logout();
            }}
          >
            Log out
          </IonButton>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
