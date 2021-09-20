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
import "./Challenges.scss";
import { useEffect, useState } from "react";
import { chevronForward, addOutline } from "ionicons/icons";
import { hideTabs, showTabs } from "../../utils/TabsUtils";
import { useHistory, useLocation } from "react-router";
import SetUpProfileModal from "../../components/setupProfile/ProfileSetUpModal";
import { useUser } from "../../contexts/UserContext";

const Challenges: React.FC = () => {
  const { user } = useUser();

  const [tab, setTab] = useState("ongoing");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();

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

  useEffect(() => {
    console.log(user);
    setTimeout(() => {
      if (!user?.username || !user?.name) {
        setShowModal(true);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonTitle>Challenges</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense' className='ion-no-border'>
          <IonToolbar>
            <IonTitle size='large'>Challenges</IonTitle>
            <IonButtons slot='end'>
              <IonButton
                style={{
                  marginRight: "1rem",
                }}
                color='dark'
                onClick={() => history.push("/challenges/create")}
              >
                <IonIcon slot='end' icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonSegment
          onIonChange={(e) => setTab(e.detail.value ?? "active")}
          value={tab}
          style={{ marginTop: "1rem" }}
          mode='md'
        >
          <IonSegmentButton value='ongoing'>
            <IonLabel>Ongoing</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='pending'>
            <IonLabel>Pending</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonButton
          expand='block'
          color='quinary'
          shape='round'
          onClick={() => setShowModal(true)}
          style={{ margin: "1.5rem" }}
        >
          Set up profile
        </IonButton>
        <IonCard button routerLink={"challenges/1/details"}>
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
                      Ends in: 1 day 4 hours
                    </IonText>
                  </IonRow>
                  <IonRow>
                    <IonText style={{ fontSize: "0.8rem" }}>
                      4 participants
                    </IonText>
                  </IonRow>
                  <IonRow
                    style={{ paddingTop: "0.5rem" }}
                    className='ion-align-items-center'
                  >
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
        <IonCard button routerLink={"challenges/1/details"}>
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
                      Ends in: 1 day 4 hours
                    </IonText>
                  </IonRow>
                  <IonRow>
                    <IonText style={{ fontSize: "0.8rem" }}>
                      4 participants
                    </IonText>
                  </IonRow>
                  <IonRow
                    style={{ paddingTop: "0.5rem" }}
                    className='ion-align-items-center'
                  >
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
        <IonCard button routerLink={"challenges/1/details"}>
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
                      Ends in: 1 day 4 hours
                    </IonText>
                  </IonRow>
                  <IonRow>
                    <IonText style={{ fontSize: "0.8rem" }}>
                      4 participants
                    </IonText>
                  </IonRow>
                  <IonRow
                    style={{ paddingTop: "0.5rem" }}
                    className='ion-align-items-center'
                  >
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
        <SetUpProfileModal showModal={showModal} setShowModal={setShowModal} />
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
