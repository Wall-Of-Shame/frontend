import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import "./Settings.scss";
import { useState } from "react";
import { arrowBackOutline } from "ionicons/icons";

const Settings: React.FC = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle
            style={{
              marginTop: "0.9rem",
              textAlign: "left",
              fontSize: "1.2rem"
            }}
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
