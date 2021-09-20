import {
  IonButton,
  IonButtons,
  IonCol,
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
import {
  addOutline,
  arrowBackOutline,
  pencil,
  removeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./OwnerChallengeDetails.scss";

interface OwnerChallengeDetailsProps {}

const OwnerChallengeDetails: React.FC<OwnerChallengeDetailsProps> = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color='dark'
              onClick={() => history.goBack()}
            >
              <IonIcon slot='end' icon={arrowBackOutline} size='large' />
            </IonButton>
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
        <IonItemDivider style={{ marginBottom: "0.25rem" }} />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom ion-align-items-center'>
            <IonCol size='6'>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                8 participants
              </IonText>
            </IonCol>
            <IonCol size='6'>
              <IonRow className='ion-justify-content-end'>
                <IonIcon
                  icon={removeOutline}
                  style={{ fontSize: "1.5rem", padding: "0.25rem" }}
                />
                <IonIcon
                  icon={addOutline}
                  style={{ fontSize: "1.5rem", padding: "0.25rem" }}
                />
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OwnerChallengeDetails;
