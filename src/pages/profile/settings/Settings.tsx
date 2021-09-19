import {
  IonAvatar,
  IonBackButton,
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
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import "./Settings.scss";
import { useEffect, useState } from "react";
import { arrowBackOutline, checkmark } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";

const Settings: React.FC = () => {
  const [tab, setTab] = useState("ongoing");

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle
            style={{
              marginTop: "1rem",
            }}
            slot="start"
          >
            Settings
          </IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              text=""
              icon={arrowBackOutline}
              color="dark"
              style={{
                marginTop: "1.5rem",
                marginLeft: "1rem",
              }}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ paddingTop: "2.5rem" }}>
          <IonRow className="ion-padding">
            <IonText style={{ fontWeight: "bold", fontSize: 19 }}>
              Notifications
            </IonText>
          </IonRow>

          <IonRow className="ion-padding ion-align-items-center">
            <IonCol size="9">
              <IonText style={{ fontSize: 17 }}>Deadline reminders</IonText>
            </IonCol>

            <IonCol size="3">
              <IonToggle className="toggle"/>
            </IonCol>
          </IonRow>
          
          <IonRow className="ion-padding-horizontal ion-align-items-center">
            <IonCol size="9">
              <IonText style={{ fontSize: 17 }}>Invitations</IonText>
            </IonCol>

            <IonCol size="3">
              <IonToggle className="toggle"/>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
