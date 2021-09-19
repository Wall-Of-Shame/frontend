import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./EditProfile.scss";
import { useEffect, useState } from "react";
import { close, checkmark } from "ionicons/icons";
import yoda from "../../../assets/avatar-yoda.png";

const EditProfile: React.FC = () => {
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
            Edit Profile
          </IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              text=""
              icon={close}
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
        <div className="edit-avatar-container">
          <IonAvatar className="edit-profile-avatar ion-margin-bottom">
            <img src={yoda} />
          </IonAvatar>
          <IonText>Pick another avatar</IonText>
        </div>

        <IonList className="ion-padding-vertical">
          <IonItem lines="full" className="ion-margin-bottom">
            <IonLabel color="primary" position="floating">
              Display name
            </IonLabel>
            <IonInput
              name="display_name"
              type="text"
              value="John Tan"
              required
              // onIonChange={(event: CustomEvent) => {
              //   setState({ displayName: event.detail.value });
              // }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel color="primary" position="floating">
              Username
            </IonLabel>
            <IonInput
              name="username"
              type="text"
              value="johntan98"
              required
              // onIonChange={(event: CustomEvent) => {
              //   setState({ username: event.detail.value });
              // }}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
