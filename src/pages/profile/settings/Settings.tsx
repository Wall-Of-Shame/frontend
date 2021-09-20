import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
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
import { useUser } from "../../../contexts/UserContext";
import { ToggleChangeEventDetail } from "@ionic/core";

const Settings: React.FC = () => {
  const { user, updateProfile } = useUser();
  const [settings, setSettings] = useState(
    user?.settings ?? {
      deadlineReminder: true,
      invitations: true,
    }
  );

  const handleReminderChange = (
    event: CustomEvent<ToggleChangeEventDetail>
  ) => {
    const newSettings = {
      deadlineReminder: event.detail.checked,
      invitations: settings.invitations,
    };
    setSettings(newSettings);
    console.log(newSettings);
    updateProfile(
      user?.name ?? "",
      user?.username ?? "",
      newSettings,
      user?.avatar ?? {
        animal: "CAT",
        color: "PRIMARY",
        background: "#ffffff",
      }
    );
  };

  const handleInvitationsChange = (
    event: CustomEvent<ToggleChangeEventDetail>
  ) => {
    console.log(event);
    const newSettings = {
      deadlineReminder: settings.deadlineReminder,
      invitations: event.detail.checked,
    };
    setSettings(newSettings);
    updateProfile(
      user?.name ?? "",
      user?.username ?? "",
      newSettings,
      user?.avatar ?? {
        animal: "CAT",
        color: "PRIMARY",
        background: "#ffffff",
      }
    );
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonTitle
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              fontSize: "1.5rem",
            }}
          >
            Settings
          </IonTitle>
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
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid style={{ paddingTop: "2.5rem" }}>
          <IonRow className='ion-padding'>
            <IonText style={{ fontWeight: "bold", fontSize: 32 }}>
              Notifications
            </IonText>
          </IonRow>
          <IonList>
            <IonItem lines='none' style={{ marginTop: "0.5rem" }}>
              <IonLabel slot='start'>Deadline Reminders</IonLabel>
              <IonToggle
                slot='end'
                className='toggle'
                checked={settings.deadlineReminder}
                onIonChange={handleReminderChange}
              />
            </IonItem>
            <IonItem lines='none' style={{ marginTop: "0.5rem" }}>
              <IonLabel slot='start'>Invitations</IonLabel>
              <IonToggle
                slot='end'
                className='toggle'
                checked={settings.invitations}
                onIonChange={handleInvitationsChange}
              />
            </IonItem>
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
