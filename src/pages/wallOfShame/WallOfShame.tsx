import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./WallOfShame.scss";
import yoda from "../../assets/avatar-yoda.png";
import rey from "../../assets/avatar-rey.png";
import luke from "../../assets/avatar-luke.png";
import finn from "../../assets/avatar-finn.png";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import { useLocation } from "react-router";
import { medal } from "ionicons/icons";
import { database } from "../../firebase";
import {
  ref,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { Shame } from "../../interfaces/models/Challenges";
import { differenceInSeconds, format, parseISO } from "date-fns";

const WallOfShame: React.FC = () => {
  const [tab, setTab] = useState("live");
  const location = useLocation();

  const [shames, setShames] = useState<Shame[]>([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [hasSynced, setHasSynced] = useState(false);

  const topShamesRef = query(
    ref(database, "shames"),
    orderByKey(),
    limitToLast(50)
  );

  onValue(topShamesRef, (snapshot) => {
    const object = snapshot.val();

    const newTime = Date.now();
    // Debounce the events
    if (differenceInSeconds(lastUpdated, newTime) < 2 && hasSynced) {
      return;
    }
    setLastUpdated(newTime);
    if (object) {
      const parsedValues = Object.values(object) as Shame[];
      if (parsedValues) {
        setShames(parsedValues.reverse());
        setHasSynced(true);
      }
    }
  });

  useEffect(() => {
    if (
      location.pathname === "/challenges" ||
      location.pathname === "/wall-of-shame" ||
      location.pathname === "/profile"
    ) {
      showTabs();
    } else {
      hideTabs();
    }
  }, [location.pathname]);

  const renderWall = () => {
    switch (tab) {
      case "live":
        return (
          <IonList>
            {shames.map((s) => {
              return (
                <IonItem key={s.timestamp}>
                  <IonAvatar slot='start'>
                    <img src={luke} alt='user1' />
                  </IonAvatar>
                  <IonLabel>
                    <h6>{s.name} has failed to:</h6>
                    <h4 style={{ fontWeight: "bold" }}>{s.title}</h4>
                    <h6>
                      At {format(parseISO(s.time), "dd MMM yyyy, HH:mm:ss")}
                    </h6>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        );
      case "shameful":
        return (
          <IonList>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={luke} alt='user1' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Luke</h4>
              </IonLabel>
              <IonIcon slot='end' icon={medal}></IonIcon>
              <IonLabel slot='end'>45</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={yoda} alt='user2' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Yoda</h4>
              </IonLabel>
              <IonIcon slot='end' icon={medal}></IonIcon>
              <IonLabel slot='end'>42</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={rey} alt='user3' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Rey</h4>
              </IonLabel>
              <IonIcon slot='end' icon={medal}></IonIcon>
              <IonLabel slot='end'>33</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={finn} alt='user4' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Finn</h4>
              </IonLabel>
              <IonLabel slot='end'>25</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={finn} alt='user4' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Finn</h4>
              </IonLabel>
              <IonLabel slot='end'>21</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={finn} alt='user4' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Finn</h4>
              </IonLabel>
              <IonLabel slot='end'>15</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              <IonAvatar slot='start'>
                <img src={finn} alt='user4' />
              </IonAvatar>
              <IonLabel>
                <h4 style={{ fontWeight: "bold" }}>Finn</h4>
              </IonLabel>
              <IonLabel slot='end'>11</IonLabel>
            </IonItem>
          </IonList>
        );
    }
  };

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
        <IonGrid>
          <IonRow>
            <IonCol size='6' style={{ paddingRight: "0px" }}>
              <IonButton
                color='senary'
                expand='block'
                style={{
                  fontWeight: tab === "live" ? "bold" : "normal",
                }}
                onClick={() => setTab("live")}
              >
                Live
              </IonButton>
            </IonCol>
            <IonCol size='6' style={{ paddingLeft: "0px" }}>
              <IonButton
                color='tertiary'
                expand='block'
                style={{ fontWeight: tab !== "live" ? "bold" : "normal" }}
                onClick={() => setTab("shameful")}
              >
                Shameful 100
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {renderWall()}
      </IonContent>
    </IonPage>
  );
};

export default WallOfShame;
