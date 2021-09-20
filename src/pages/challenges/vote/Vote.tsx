import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Vote.scss";
import { useHistory } from "react-router";
import { arrowBackOutline } from "ionicons/icons";

const Vote: React.FC = () => {

  const history = useHistory();


  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color="dark"
              onClick={() => history.goBack()}
            >
              <IonIcon slot="end" icon={arrowBackOutline} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ margin: "0.5rem" }}>
          <IonRow className='ion-padding'>
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Vote to banish a cheater to the wall
            </IonText>
          </IonRow>
          <IonRow className='ion-padding'>
            <IonText style={{ fontSize: 17 }}>
              <strong>7</strong> people have to vote for a justified shaming
            </IonText>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              
            </IonCol>
            <IonCol>
              
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Vote;
