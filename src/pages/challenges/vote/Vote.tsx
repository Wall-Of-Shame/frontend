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
import yoda from "../../../assets/avatar-yoda.png";

const Vote: React.FC = () => {
  const history = useHistory();

  const userCard = (
    <IonCol
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IonRow className="ion-align-items">
        <IonAvatar className="edit-profile-avatar ion-margin-bottom">
          <img src={yoda} alt="avatar" />
        </IonAvatar>
      </IonRow>
      <IonRow className="ion-margin-bottom">
        <IonText style={{ fontWeight: "bold" }}>Wang Luo</IonText>
      </IonRow>
      <IonRow className="ion-margin-bottom">
        <IonText>2 votes</IonText>
      </IonRow>
      <IonRow>
        <IonButton
          shape="round"
          color="secondary"
          fill="solid"
          style={{ height: "2.5rem", width: "4.5rem" }}
        >
          <IonText
            style={{
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Vote
          </IonText>
        </IonButton>
      </IonRow>
    </IonCol>
  );

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
          <IonRow className="ion-padding">
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Vote to banish a cheater to the wall
            </IonText>
          </IonRow>
          <IonRow className="ion-padding">
            <IonText style={{ fontSize: 17 }}>
              <strong>7</strong> people have to vote for a successful shaming 😊
            </IonText>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow className="ion-padding-vertical">
            {userCard}
            {userCard}
          </IonRow>
          <IonRow className="ion-padding-vertical">
            {userCard}
            {userCard}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Vote;
