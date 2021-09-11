import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import "./WallOfShame.css";
import yoda from "../../assets/avatar-yoda.png";
import rey from "../../assets/avatar-rey.png";
import luke from "../../assets/avatar-luke.png";
import finn from "../../assets/avatar-finn.png";

const WallOfShame: React.FC = () => {
  const [tab, setTab] = useState("live");

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ marginTop: "2.5rem" }}>
          <IonRow class='ion-justify-content-center ion-no-padding'>
            <h1 style={{ fontSize: "1.25rem", marginBottom: "0px" }}>THE</h1>
          </IonRow>
          <IonRow class='ion-justify-content-center ion-no-padding'>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bolder",
                marginTop: "0px",
              }}
            >
              WALL OF SHAME
            </h1>
          </IonRow>
        </div>

        <IonSegment
          onIonChange={(e) => setTab(e.detail.value ?? "live")}
          value={tab}
          style={{ marginTop: "1rem" }}
        >
          <IonSegmentButton value='live'>
            <IonLabel>Live</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='forbes'>
            <IonLabel>Forbes 100</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={luke} alt='user1' />
            </IonAvatar>
            <IonLabel>
              <h6>Luke has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>WATCH ALL CS1010 LECTURES</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={yoda} alt='user2' />
            </IonAvatar>
            <IonLabel>
              <h6>Master Yoda has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>WATCH ALL CS3216 LECTURES</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={rey} alt='user3' />
            </IonAvatar>
            <IonLabel>
              <h6>Rey has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>WATCH ALL CS3217 LECTURES</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={finn} alt='user4' />
            </IonAvatar>
            <IonLabel>
              <h6>Finn has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>RUN 10KM BY THIS WEEKEND</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={luke} alt='user1' />
            </IonAvatar>
            <IonLabel>
              <h6>Luke has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>WATCH ALL CS1010 LECTURES</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={yoda} alt='user2' />
            </IonAvatar>
            <IonLabel>
              <h6>Master Yoda has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>WATCH ALL CS3216 LECTURES</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={rey} alt='user3' />
            </IonAvatar>
            <IonLabel>
              <h6>Rey has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>WATCH ALL CS3217 LECTURES</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot='start'>
              <img src={finn} alt='user4' />
            </IonAvatar>
            <IonLabel>
              <h6>Finn has failed to:</h6>
              <h4 style={{ fontWeight: "bold" }}>RUN 10KM BY THIS WEEKEND</h4>
              <p>1 second ago</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WallOfShame;
