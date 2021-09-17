import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

interface ChallengeDetailsProps {}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = () => {
  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton
              text=''
              icon={arrowBackOutline}
              color='dark'
              style={{
                marginTop: "1.5rem",
                marginLeft: "1.5rem",
              }}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default ChallengeDetails;
