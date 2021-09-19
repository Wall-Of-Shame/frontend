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
import "./EditProfile.scss";
import { useEffect, useState } from "react";
import { arrowBackOutline, checkmark } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";

const EditProfile: React.FC = () => {
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
            Edit Profile
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
          <IonButtons slot="end">
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color="dark"
            >
              <IonIcon
                slot="end"
                icon={checkmark}
                style={{ fontSize: "32px" }}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
