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
  IonSelect,
  IonSelectOption,
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

const WallOfShame: React.FC = () => {
  const [tab, setTab] = useState("live");
  const location = useLocation();

  const countries = ["Singapore", "Malaysia", "Indonesia", "Thailand"];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [country, setCountry] = useState("Singapore");

  useEffect(() => {
    if (
      location.pathname !== "/challenges" &&
      location.pathname !== "/wall-of-shame" &&
      location.pathname !== "/profile"
    ) {
      hideTabs();
    } else {
      showTabs();
    }
  }, [location.pathname]);

  const renderWall = () => {
    switch (tab) {
      case "live":
        return (
          <IonList>
            <IonItem>
              <IonAvatar slot='start'>
                <img src={luke} alt='user1' />
              </IonAvatar>
              <IonLabel>
                <h6>Luke has failed to:</h6>
                <h4 style={{ fontWeight: "bold" }}>
                  WATCH ALL CS1010 LECTURES
                </h4>
                <p>1 second ago</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img src={yoda} alt='user2' />
              </IonAvatar>
              <IonLabel>
                <h6>Master Yoda has failed to:</h6>
                <h4 style={{ fontWeight: "bold" }}>
                  WATCH ALL CS3216 LECTURES
                </h4>
                <p>1 second ago</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img src={rey} alt='user3' />
              </IonAvatar>
              <IonLabel>
                <h6>Rey has failed to:</h6>
                <h4 style={{ fontWeight: "bold" }}>
                  WATCH ALL CS3217 LECTURES
                </h4>
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
                <h4 style={{ fontWeight: "bold" }}>
                  WATCH ALL CS1010 LECTURES
                </h4>
                <p>1 second ago</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img src={yoda} alt='user2' />
              </IonAvatar>
              <IonLabel>
                <h6>Master Yoda has failed to:</h6>
                <h4 style={{ fontWeight: "bold" }}>
                  WATCH ALL CS3216 LECTURES
                </h4>
                <p>1 second ago</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img src={rey} alt='user3' />
              </IonAvatar>
              <IonLabel>
                <h6>Rey has failed to:</h6>
                <h4 style={{ fontWeight: "bold" }}>
                  WATCH ALL CS3217 LECTURES
                </h4>
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
        );
      case "shameful":
        return (
          <IonList>
            <IonItem
              className='ion-padding-horizontal'
              style={{ paddingBottom: "1rem" }}
              lines='full'
            >
              <IonLabel>Country</IonLabel>
              <IonSelect
                ok-text='Okay'
                cancel-text='Nah'
                onIonChange={(e) => setCountry(e.detail.value)}
              >
                {countries.map((c) => {
                  return (
                    <IonSelectOption value={c} key={c}>
                      {c}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
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
