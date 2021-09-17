import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline, pencil } from "ionicons/icons";
import "./ChallengeDetails.scss";

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
                marginLeft: "1rem",
              }}
            />
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
        <IonGrid>
          <IonRow className='ion-padding'>
            <IonText>You have created a challenge to</IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Watch all CS1010 lectures ahhahahahah
            </IonText>
          </IonRow>
        </IonGrid>
        <div className='separator' />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              What do I need to do?
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>
              Finish ALL CS1010 LECTURES from week 1 to week 11 hahahahahah
              we’re so dead hahaahhahh
            </IonText>
          </IonRow>
        </IonGrid>
        <div className='separator' />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              Complete the challenge by
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>Fri, 12 September, 11:50 pm</IonText>
          </IonRow>
        </IonGrid>
        <IonItemDivider />
      </IonContent>
    </IonPage>
  );
};

export default ChallengeDetails;
