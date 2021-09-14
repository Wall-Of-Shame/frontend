import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import yoda from "../../assets/avatar-yoda.png";
import rey from "../../assets/avatar-rey.png";
import poe from "../../assets/avatar-poe.png";
import luke from "../../assets/avatar-luke.png";
import finn from "../../assets/avatar-finn.png";
import leia from "../../assets/avatar-leia.png";
import "./Challenges.css";
import { useState } from "react";
import { add } from "ionicons/icons";

const Tab1: React.FC = () => {
  const [tab, setTab] = useState("active");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenges</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense' className='ion-no-border'>
          <IonToolbar>
            <IonTitle size='large'>Challenges</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSegment
          onIonChange={(e) => setTab(e.detail.value ?? "active")}
          value={tab}
          style={{ marginTop: "1rem" }}
          mode='md'
        >
          <IonSegmentButton value='active'>
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='invitations'>
            <IonLabel>Invitations</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='history'>
            <IonLabel>History</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "1.4rem" }}>
              Watch CS3216 Lecture
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText style={{ fontSize: "0.8rem" }}>
              Ends in: 1 day 4 hours
            </IonText>
            <IonRow style={{ paddingTop: "0.5rem" }}>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={luke} alt='user1' />
              </IonAvatar>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={yoda} alt='user2' />
              </IonAvatar>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={poe} alt='user3' />
              </IonAvatar>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={rey} alt='user4' />
              </IonAvatar>
            </IonRow>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader
            className='ion-no-padding ion-padding-top ion-padding-horizontal'
            style={{ paddingBottom: "0.5rem" }}
          >
            <IonCardTitle style={{ fontSize: "1.2rem" }}>
              Watch CS3216 Lecture
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText style={{ fontSize: "0.8rem" }}>
              Ends in: 1 day 4 hours
            </IonText>
            <IonRow
              style={{ paddingTop: "0.5rem" }}
              className='ion-align-items-center'
            >
              <IonText style={{ fontSize: "0.8rem", marginRight: "0.5rem" }}>
                4 participants
              </IonText>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={finn} alt='user1' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={rey} alt='user2' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={poe} alt='user3' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={yoda} alt='user4' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={finn} alt='user1' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={rey} alt='user2' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={poe} alt='user3' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={yoda} alt='user4' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={finn} alt='user1' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={rey} alt='user2' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={poe} alt='user3' />
              </IonAvatar>
              <IonAvatar className='avatar' style={{ marginRight: "0.25rem" }}>
                <img src={yoda} alt='user4' />
              </IonAvatar>
            </IonRow>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "1.5rem" }}>
              Watch CS3216 Lecture
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText style={{ fontSize: "0.8rem" }}>
              Ends in: 1 day 4 hours
            </IonText>
            <IonRow style={{ paddingTop: "0.5rem" }}>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={poe} alt='user1' />
              </IonAvatar>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={rey} alt='user2' />
              </IonAvatar>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={finn} alt='user3' />
              </IonAvatar>
              <IonAvatar style={{ marginRight: "0.25rem" }}>
                <img src={leia} alt='user4' />
              </IonAvatar>
            </IonRow>
          </IonCardContent>
        </IonCard>
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
