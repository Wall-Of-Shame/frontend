import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Container from "../../components/container/Container";
import { useAuth } from "../../contexts/AuthContext";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/challenges" &&
      location.pathname !== "/wall-of-shame" &&
      location.pathname !== "/profile"
    ) {
      hideTabs();
    } else {
      showTabs();
    }
  }, [location.pathname]);

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense' className='ion-no-border'>
          <IonToolbar>
            <IonTitle size='large'>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Container>
          <IonButton
            expand='block'
            color='secondary'
            onClick={() => {
              logout();
            }}
            style={{ marginBottom: "1rem" }}
          >
            Log out
          </IonButton>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
