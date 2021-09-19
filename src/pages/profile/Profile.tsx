import React, { useState } from "react";
import {
  IonAvatar,
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
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  IonPopover,
} from "@ionic/react";
import yoda from "../../assets/avatar-yoda.png";
import rey from "../../assets/avatar-rey.png";
import poe from "../../assets/avatar-poe.png";
import luke from "../../assets/avatar-luke.png";
import { useEffect } from "react";
import {
  chevronForward,
  ellipsisVertical,
  createOutline,
  settingsOutline,
  logOutOutline,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

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

  return (
    <IonPage>
      <IonPopover
        cssClass='popover'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          <IonItem
            button
            detail={false}
            lines='none'
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
              history.push("/profile/edit");
            }}
          >
            <IonIcon
              slot='start'
              icon={createOutline}
              style={{ fontSize: "24px" }}
            />
            <IonLabel>Edit profile</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            lines='none'
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
              history.push("/profile/settings");
            }}
          >
            <IonIcon
              slot='start'
              icon={settingsOutline}
              style={{ fontSize: "24px" }}
            />
            <IonLabel>Settings</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            lines='none'
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
              logout();
            }}
            style={{ marginBottom: "1rem" }}
          >
            <IonIcon
              slot='start'
              icon={logOutOutline}
              style={{ fontSize: "24px" }}
            />
            <IonLabel>Log out</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>

      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color='dark'
              onClick={(e: any) => {
                e.persist();
                setShowPopover({ showPopover: true, event: e });
              }}
            >
              <IonIcon
                slot='end'
                icon={ellipsisVertical}
                style={{ fontSize: "24px" }}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className='ion-align-items-center'>
            <IonCol size='5'>
              <IonAvatar className='user-avatar'>
                <img src={yoda} alt='user2' />
              </IonAvatar>
            </IonCol>
            <IonCol size='7'>
              <IonRow>
                <IonText
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    paddingBottom: "0.5rem",
                  }}
                >
                  John Tan
                </IonText>
              </IonRow>
              <IonRow>
                <IonText style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  @johntan
                </IonText>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid style={{ paddingBottom: "2rem" }}>
          <IonRow className='ion-align-items-center'>
            <IonCol>
              <IonCard
                className='profile-statistic ion-text-center'
                color='senary'
              >
                <IonCardContent>
                  <IonText style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                    20 Challenges Completed
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard
                className='profile-statistic ion-text-center'
                color='tertiary'
              >
                <IonCardContent>
                  <IonText
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      padding: "1rem",
                    }}
                  >
                    4 Shameful Failures
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonText
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            paddingLeft: "1rem",
            color: "grey",
          }}
        >
          Challenge history
        </IonText>

        <IonCard button>
          <IonGrid className='ion-no-padding'>
            <IonRow className='ion-align-items-center'>
              <IonCol size='11'>
                <IonCardHeader
                  className='ion-no-padding ion-padding-top ion-padding-horizontal'
                  style={{ paddingBottom: "0.75rem" }}
                >
                  <IonCardTitle style={{ fontSize: "1.2rem" }}>
                    Watch CS3216 Lecture
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonText
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Completed 4 hours ago
                    </IonText>
                  </IonRow>
                  <IonRow
                    style={{ paddingTop: "0.5rem" }}
                    className='ion-align-items-center'
                  >
                    <IonText
                      style={{ fontSize: "0.8rem", paddingRight: "1rem" }}
                    >
                      4 participants
                    </IonText>
                    <IonAvatar
                      className='avatar'
                      style={{ marginRight: "0.25rem" }}
                    >
                      <img src={luke} alt='user1' />
                    </IonAvatar>
                    <IonAvatar
                      className='avatar'
                      style={{ marginRight: "0.25rem" }}
                    >
                      <img src={yoda} alt='user2' />
                    </IonAvatar>
                    <IonAvatar
                      className='avatar'
                      style={{ marginRight: "0.25rem" }}
                    >
                      <img src={poe} alt='user3' />
                    </IonAvatar>
                    <IonAvatar
                      className='avatar'
                      style={{ marginRight: "0.25rem" }}
                    >
                      <img src={rey} alt='user4' />
                    </IonAvatar>
                  </IonRow>
                </IonCardContent>
              </IonCol>
              <IonCol size='1'>
                <IonIcon icon={chevronForward} style={{ fontSize: "24px" }} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
