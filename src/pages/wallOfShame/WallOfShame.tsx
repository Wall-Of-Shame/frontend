import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useReducer, useState } from "react";
import "./WallOfShame.scss";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import { useLocation } from "react-router";
import { refreshOutline, trophy } from "ionicons/icons";
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
import { UserList } from "../../interfaces/models/Users";
import { useUser } from "../../contexts/UserContext";
import LoadingSpinner from "../../components/loadingSpinner";
import Alert from "../../components/alert";
import AvatarImg from "../../components/avatar";
import { isPlatform } from "@ionic/core";

interface WallOfShameState {
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const WallOfShame: React.FC = () => {
  const location = useLocation();
  const { getGlobalRankings, getFriendsRankings } = useUser();

  const [tab, setTab] = useState("live");
  const [shames, setShames] = useState<Shame[]>([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [hasSynced, setHasSynced] = useState(false);
  const [globalRankings, setGlobalRankings] = useState<UserList[]>([]);
  const [friendsRankings, setFriendsRankings] = useState<UserList[]>([]);
  const types = ["Global", "Friends"];
  const trophyColors = ["#ffd73c", "#bcbcbc", "#be7b2d"];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState("Global");

  const [state, setState] = useReducer(
    (s: WallOfShameState, a: Partial<WallOfShameState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: false,
      showAlert: false,
      alertHeader: "",
      alertMessage: "",
      hasConfirm: false,
      confirmHandler: () => {},
      cancelHandler: () => {},
      okHandler: undefined,
    }
  );

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

  const fetchData = async (): Promise<void> => {
    setState({ isLoading: true });
    try {
      const global = await getGlobalRankings();
      const friends = await getFriendsRankings();
      setGlobalRankings(global);
      setFriendsRankings(friends);
      if (hasSynced) {
        setTimeout(() => {
          setState({ isLoading: false });
        }, 1000);
      } else {
        setState({ isLoading: false });
      }
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        hasConfirm: false,
        alertHeader: "Ooooops",
        alertMessage:
          "Could not retrieve the Wall of Shame at the moment, please come back later :)",
      });
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
        if (shames.length <= 0) {
          return (
            <IonGrid
              style={{
                display: "flex",
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonRow className="ion-padding">No records yet</IonRow>
            </IonGrid>
          );
        }
        return (
          <IonList>
            {shames.map((s) => {
              return (
                <IonItem key={s.timestamp}>
                  <IonAvatar slot="start">
                    <AvatarImg avatar={s.avatar} />
                  </IonAvatar>
                  {s.type === "cheat" ? (
                    <IonLabel>
                      <h6>{s.name} cheated in the challenge:</h6>
                      <h4 style={{ fontWeight: "bold" }}>{s.title}</h4>
                      <h6>
                        On {format(parseISO(s.time), "dd MMM yyyy, HH:mm:ss")}
                      </h6>
                    </IonLabel>
                  ) : (
                    <IonLabel>
                      <h6>{s.name} failed the challenge:</h6>
                      <h4 style={{ fontWeight: "bold" }}>{s.title}</h4>
                      <h6>
                        On {format(parseISO(s.time), "dd MMM yyyy, HH:mm:ss")}
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
          <IonList>
            <IonItem
              className="ion-padding-horizontal"
              style={{ paddingBottom: "1rem" }}
              lines="full"
            >
              <IonLabel>Viewing</IonLabel>
              <IonSelect
                ok-text="Proceed"
                cancel-text="Cancel"
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
                {globalRankings.length > 0 ? (
                  <>
                    {globalRankings.map((r, index) => {
                      return (
                        <IonItem lines="none" key={r.userId}>
                          <IonAvatar slot="start">
                            <AvatarImg avatar={r.avatar} />
                          </IonAvatar>
                          <IonLabel>
                            <h4 style={{ fontWeight: "bold" }}>{r.name}</h4>
                          </IonLabel>
                          <IonLabel slot="end">
                            {r.failedChallengeCount}
                          </IonLabel>
                          {index < 3 ? (
                            <IonIcon
                              slot="end"
                              icon={trophy}
                              style={{
                                color: trophyColors[index],
                              }}
                            ></IonIcon>
                          ) : (
                            <IonIcon
                              slot="end"
                              icon={trophy}
                              color="light"
                              style={{
                                opacity: 0,
                              }}
                            ></IonIcon>
                          )}
                        </IonItem>
                      );
                    })}
                  </>
                ) : (
                  <IonGrid
                    style={{
                      display: "flex",
                      height: "70%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonRow className="ion-padding">No records yet</IonRow>
                  </IonGrid>
                )}
              </>
            ) : (
              <>
                {friendsRankings.length > 0 ? (
                  <>
                    {friendsRankings.map((r, index) => {
                      return (
                        <IonItem lines="none" key={r.userId}>
                          <IonAvatar slot="start">
                            <AvatarImg avatar={r.avatar} />{" "}
                          </IonAvatar>
                          <IonLabel>
                            <h4 style={{ fontWeight: "bold" }}>{r.name}</h4>
                          </IonLabel>
                          <IonLabel slot="end">
                            {r.failedChallengeCount}
                          </IonLabel>
                          {index < 3 ? (
                            <IonIcon
                              slot="end"
                              icon={trophy}
                              style={{
                                color: trophyColors[index],
                              }}
                            ></IonIcon>
                          ) : (
                            <IonIcon
                              slot="end"
                              icon={trophy}
                              color="light"
                              style={{
                                opacity: 0,
                              }}
                            ></IonIcon>
                          )}
                        </IonItem>
                      );
                    })}
                  </>
                ) : (
                  <IonGrid
                    style={{
                      display: "flex",
                      height: "70%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonRow className="ion-padding">No records yet</IonRow>
                  </IonGrid>
                )}
              </>
            )}
          </IonList>
        );
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          {isPlatform("ios") ? (
            <IonTitle>Wall of Shame</IonTitle>
          ) : (
            <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              <IonRow class="ion-justify-content-center ion-no-padding">
                <h1 style={{ fontSize: "1.25rem", marginBottom: "0px" }}>
                  THE
                </h1>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-no-padding">
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
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar>
            <div>
              <IonRow class="ion-justify-content-center ion-no-padding">
                <h1 style={{ fontSize: "1.25rem", marginBottom: "0px" }}>
                  THE
                </h1>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-no-padding">
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
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="6" style={{ paddingRight: "0px" }}>
              <IonButton
                mode="ios"
                color={tab === "live" ? "quaternary" : "tertiary"}
                expand="block"
                style={{
                  fontWeight: tab === "live" ? "900" : "normal",
                  textDecoration: tab === "live" ? "underline" : "none",
                }}
                onClick={() => setTab("live")}
              >
                Live
              </IonButton>
            </IonCol>
            <IonCol size="6" style={{ paddingLeft: "0px" }}>
              <IonButton
                mode="ios"
                color={tab !== "live" ? "quaternary" : "tertiary"}
                expand="block"
                style={{
                  fontWeight: tab !== "live" ? "900" : "normal",
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
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="senary" onClick={fetchData} mode="ios">
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>
        <LoadingSpinner
          loading={state.isLoading}
          message={"Loading"}
          closeLoading={() => {}}
        />
        <Alert
          showAlert={state.showAlert}
          closeAlert={(): void => {
            setState({
              showAlert: false,
            });
          }}
          alertHeader={state.alertHeader}
          alertMessage={state.alertMessage}
          hasConfirm={state.hasConfirm}
          confirmHandler={state.confirmHandler}
          cancelHandler={state.cancelHandler}
          okHandler={state.okHandler}
        />
      </IonContent>
    </IonPage>
  );
};

export default WallOfShame;
