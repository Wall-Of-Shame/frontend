import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import Container from "../../../components/container";

interface ChallengeHelpProps {
  nextPage: () => void;
  prevPage: () => void;
}

const ChallengeHelp: React.FC<ChallengeHelpProps> = (
  props: ChallengeHelpProps
) => {
  const { nextPage, prevPage } = props;

  return (
    <IonContent fullscreen>
      <IonFab
        horizontal='start'
        vertical='top'
        style={{ marginTop: "1rem", marginLeft: "0.5rem" }}
      >
        <IonIcon icon={arrowBackOutline} size='large' onClick={prevPage} />
      </IonFab>
      <Container>
        <IonRow slot='start' style={{ marginBottom: "2rem" }}>
          <IonText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            Challenges
          </IonText>
        </IonRow>
        <IonButton
          mode='ios'
          fill='solid'
          shape='round'
          color='secondary'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          onClick={nextPage}
        >
          <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
            Continue
          </IonText>
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default ChallengeHelp;
