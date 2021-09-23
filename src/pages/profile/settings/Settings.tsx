import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
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
import { useEffect, useState } from "react";
import { arrowBackOutline } from "ionicons/icons";
import { useUser } from "../../../contexts/UserContext";
import { ToggleChangeEventDetail } from "@ionic/core";
import { useHistory } from "react-router";
import { hideTabs } from "../../../utils/TabsUtils";

const Settings: React.FC = () => {
  const history = useHistory();
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
    updateProfile(
      user?.name ?? "",
      user?.username ?? "",
      newSettings,
      user?.avatar ?? {
        animal: "CAT",
        color: "PRIMARY",
        background: "#cbe8e0",
      }
    );
  };

  const handleInvitationsChange = (
    event: CustomEvent<ToggleChangeEventDetail>
  ) => {
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
        background: "#cbe8e0",
      }
    );
  };

  useEffect(() => {
    hideTabs();
  }, []);

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
