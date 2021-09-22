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
import { useUser } from "../../contexts/UserContext";
import { RootState } from "../../reducers/RootReducer";
import { ChallengeDux } from "../../reducers/ChallengeDux";
import { useSelector } from "react-redux";
import { ChallengeData } from "../../interfaces/models/Challenges";
import parseISO from "date-fns/esm/fp/parseISO/index.js";
import { format } from "date-fns";

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useUser();
  const location = useLocation();
  const history = useHistory();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const selectChallenges = (state: RootState): ChallengeDux => state.challenges;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pastChallenges, setPastChallenges] = useState<ChallengeData[]>(
    useSelector(selectChallenges).history
  );

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

  const renderHistory = () => {
    return (
      <>
        {pastChallenges?.map((c) => {
          const acceptedCount = c.participants.accepted.completed.concat(
            c.participants.accepted.notCompleted
          ).length;
          return (
            <IonCard
              button
              key={c.challengeId}
              onClick={() => {
                history.push(`challenges/${c.challengeId}/details`, c);
              }}
            >
              <IonGrid className='ion-no-padding'>
                <IonRow className='ion-align-items-center'>
                  <IonCol size='11'>
                    <IonCardHeader
                      className='ion-no-padding ion-padding-top ion-padding-horizontal'
                      style={{ paddingBottom: "0.75rem" }}
                    >
                      <IonCardTitle style={{ fontSize: "1.2rem" }}>
                        {c.title}
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
                          {`Ended at: ${format(
                            parseISO(c.endAt),
                            "yy MMM dd, HH:ss"
                          )}`}
                        </IonText>
                      </IonRow>
                      <IonRow>
                        <IonText style={{ fontSize: "0.8rem" }}>
                          {acceptedCount} participant
                          {acceptedCount === 1 ? "" : "s"}
                        </IonText>
                      </IonRow>
                      <IonRow
                        style={{ paddingTop: "0.5rem" }}
                        className='ion-align-items-center'
                      >
                        {c.participants.accepted.completed
                          .concat(c.participants.accepted.notCompleted)
                          .map((p) => {
                            return (
                              <IonAvatar
                                className='avatar'
                                key={p.userId}
                                style={{ marginRight: "0.25rem" }}
                              >
                                <img src={luke} alt='user1' />
                              </IonAvatar>
                            );
                          })}
                        {c.participants.pending.map((p) => {
                          return (
                            <IonAvatar
                              className='avatar'
                              key={p.userId}
                              style={{ marginRight: "0.25rem" }}
                            >
                              <img src={luke} alt='user1' />
                            </IonAvatar>
                          );
                        })}
                      </IonRow>
                    </IonCardContent>
                  </IonCol>
                  <IonCol size='1'>
                    <IonIcon
                      icon={chevronForward}
                      style={{ fontSize: "24px" }}
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          );
        })}
      </>
    );
  };

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
            style={{ marginTop: "0.5rem" }}
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
              history.push("/profile/edit");
            }}
          >
            <IonIcon
              slot='start'
              icon={createOutline}
              style={{ fontSize: "1.5rem" }}
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
              style={{ fontSize: "1.5rem" }}
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
            style={{ marginBottom: "0.5rem" }}
          >
            <IonIcon
              slot='start'
              icon={logOutOutline}
              style={{ fontSize: "1.5rem" }}
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
            <IonCol size='4'>
              <IonRow className='ion-justify-content-center ion-no-padding'>
                <IonAvatar id='profile-avatar'>
                  <img src={yoda} alt='user2' />
                </IonAvatar>
              </IonRow>
            </IonCol>
            <IonCol size='8'>
              <IonRow>
                <IonText
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    paddingBottom: "0.5rem",
                    marginRight: "0.5rem",
                  }}
                >
                  {user?.name ?? "Display name not set"}
                </IonText>
              </IonRow>
              <IonRow>
                <IonText
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    marginRight: "0.5rem",
                  }}
                >
                  {`@${user?.username ?? "Username not set"}`}
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
                  <IonRow className='ion-justify-content-center'>
                    <IonText
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                      }}
                    >
                      {user?.completedChallengeCount ?? 0}
                    </IonText>
                  </IonRow>
                  <IonRow className='ion-justify-content-center'>
                    <IonText style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                      Challenge{user?.completedChallengeCount !== 1 && "s"}{" "}
                      Completed
                    </IonText>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard
                className='profile-statistic ion-text-center'
                color='tertiary'
              >
                <IonCardContent>
                  <IonRow className='ion-justify-content-center'>
                    <IonText
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                      }}
                    >
                      {user?.failedChallengeCount ?? 0}
                    </IonText>
                  </IonRow>
                  <IonRow className='ion-justify-content-center'>
                    <IonText style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                      Shameful Failure{user?.failedChallengeCount !== 1 && "s"}{" "}
                    </IonText>
                  </IonRow>
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
        {renderHistory()}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
