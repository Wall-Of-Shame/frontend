import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import {
  addOutline,
  arrowBackOutline,
  pencil,
  removeOutline,
} from "ionicons/icons";
import { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { useChallenge } from "../../../contexts/ChallengeContext";
import { ChallengeData } from "../../../interfaces/models/Challenges";
import "./ChallengeDetails.scss";
import { format, parseISO } from "date-fns";
import { useUser } from "../../../contexts/UserContext";

interface ChallengeDetailsProps {}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useUser()!;
  const { getChallenge } = useChallenge();

  const [challenge, setChallenge] = useState<ChallengeData>(
    location.state as ChallengeData
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationState = location.state as ChallengeData;
        if (!locationState) {
          return;
        }
        const challenge = await getChallenge(locationState.challengeId);
        console.log(challenge);
        if (challenge) {
          setChallenge(challenge);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!(location.state as ChallengeData)) {
    return <Redirect to={"challenges"} />;
  }

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color='dark'
              onClick={() => history.goBack()}
            >
              <IonIcon slot='end' icon={arrowBackOutline} size='large' />
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton
              style={{
                marginTop: "1.5rem",
                marginRight: "1rem",
              }}
              color='dark'
            >
              <IonIcon slot='end' icon={pencil} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className='ion-padding'>
            <IonText>
              {challenge.owner.userId === user?.userId
                ? "You have created a challenge to"
                : "You have been invited to"}
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              {challenge.title}
            </IonText>
          </IonRow>
        </IonGrid>
        <div className='separator' />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              What do we need to do?
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>{challenge.description}</IonText>
          </IonRow>
        </IonGrid>
        <div className='separator' />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText style={{ fontWeight: "bold" }}>
              Complete the challenge by
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-bottom'>
            <IonText>
              {format(parseISO(challenge.endAt), "EEEE, dd MMM yyyy, HH:mm")}
            </IonText>
          </IonRow>
        </IonGrid>
        <IonItemDivider style={{ marginBottom: "0.25rem" }} />
        <IonGrid>
          <IonRow className='ion-padding-horizontal ion-padding-bottom ion-align-items-center'>
            <IonCol size='6'>
              <IonText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                8 participants
              </IonText>
            </IonCol>
            <IonCol size='6'>
              <IonRow className='ion-justify-content-end'>
                <IonIcon
                  icon={removeOutline}
                  style={{ fontSize: "1.5rem", padding: "0.25rem" }}
                />
                <IonIcon
                  icon={addOutline}
                  style={{ fontSize: "1.5rem", padding: "0.25rem" }}
                />
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChallengeDetails;
