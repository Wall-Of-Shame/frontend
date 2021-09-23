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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./WallOfShame.scss";
import luke from "../../assets/avatar-luke.png";
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
import { RefresherEventDetail } from "@ionic/core";
import { UserList } from "../../interfaces/models/Users";
import { useUser } from "../../contexts/UserContext";

const WallOfShame: React.FC = () => {
  const location = useLocation();
  const { getGlobalRankings, getFriendsRankings } = useUser();

  const [tab, setTab] = useState("live");
  const [shames, setShames] = useState<Shame[]>([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [hasSynced, setHasSynced] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [globalRankings, setGlobalRankings] = useState<UserList[]>([]);
  const [friendsRankings, setFriendsRankings] = useState<UserList[]>([]);
  const types = ["Global", "Friends"];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState("Global");

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

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      await fetchData();
      setTimeout(() => {
        event.detail.complete();
        setToastMessage("Refreshed successfully");
        setShowToast(true);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        event.detail.complete();
        setToastMessage(
          "Our server is taking a break, come back later please :)"
        );
        setShowToast(true);
      }, 2000);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const global = await getGlobalRankings();
      // const friends = await getFriendsRankings();
      setGlobalRankings(global);
      // setFriendsRankings(friends);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  {s.type === "fail" ? (
                    <IonLabel>
                      <h6>{s.name} has failed the challenge:</h6>
                      <h4 style={{ fontWeight: "bold" }}>{s.title}</h4>
                      <h6>
                        At {format(parseISO(s.time), "dd MMM yyyy, HH:mm:ss")}
                      </h6>
                    </IonLabel>
                  ) : (
                    <IonLabel>
                      <h6>{s.name} has cheated in the challenge:</h6>
                      <h4 style={{ fontWeight: "bold" }}>{s.title}</h4>
                      <h6>
                        At {format(parseISO(s.time), "dd MMM yyyy, HH:mm:ss")}
                      </h6>
                    </IonLabel>
                  )}
                </IonItem>
              );
            })}
          </IonList>
        );
      case "shameful":
        return (
          <IonContent>
            <IonRefresher
              slot='fixed'
              onIonRefresh={handleRefresh}
              style={{ zIndex: "1000" }}
            >
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

            <IonList>
              <IonItem
                className='ion-padding-horizontal'
                style={{ paddingBottom: "1rem" }}
                lines='full'
              >
                <IonLabel>Viewing</IonLabel>
                <IonSelect
                  ok-text='Proceed'
                  cancel-text='Cancel'
                  value={type}
                  onIonChange={(e) => setType(e.detail.value)}
                >
                  {types.map((t) => {
                    return (
                      <IonSelectOption value={t} key={t}>
                        {t}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              {type === "Global" ? (
                <>
                  {globalRankings.map((r) => {
                    return (
                      <IonItem lines='none' key={r.userId}>
                        <IonAvatar slot='start'>
                          <img src={luke} alt='user1' />
                        </IonAvatar>
                        <IonLabel>
                          <h4 style={{ fontWeight: "bold" }}>{r.name}</h4>
                        </IonLabel>
                        <IonIcon slot='end' icon={medal}></IonIcon>
                        <IonLabel slot='end'>{r.failedChallengeCount}</IonLabel>
                      </IonItem>
                    );
                  })}
                </>
              ) : (
                <>
                  {friendsRankings.map((r) => {
                    return (
                      <IonItem lines='none' key={r.userId}>
                        <IonAvatar slot='start'>
                          <img src={luke} alt='user1' />
                        </IonAvatar>
                        <IonLabel>
                          <h4 style={{ fontWeight: "bold" }}>Luke</h4>
                        </IonLabel>
                        <IonIcon slot='end' icon={medal}></IonIcon>
                        <IonLabel slot='end'>45</IonLabel>
                      </IonItem>
                    );
                  })}
                </>
              )}
            </IonList>
          </IonContent>
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
                color={tab === "live" ? "tertiary" : "senary"}
                expand='block'
                style={{
                  fontWeight: tab === "live" ? "800" : "normal",
                  textDecoration: tab === "live" ? "underline" : "none",
                }}
                onClick={() => setTab("live")}
              >
                Live
              </IonButton>
            </IonCol>
            <IonCol size='6' style={{ paddingLeft: "0px" }}>
              <IonButton
                color={tab !== "live" ? "tertiary" : "senary"}
                expand='block'
                style={{
                  fontWeight: tab !== "live" ? "800" : "normal",
                  textDecoration: tab !== "live" ? "underline" : "none",
                }}
                onClick={() => setTab("shameful")}
              >
                Shameful 100
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {renderWall()}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={1500}
        />
      </IonContent>
    </IonPage>
  );
};

export default WallOfShame;
