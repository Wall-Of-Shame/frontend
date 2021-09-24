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
import "../../../theme/transitions.scss";

interface WallOfShameHelpProps {
  nextPage: () => void;
  prevPage: () => void;
}

const WallOfShameHelp: React.FC<WallOfShameHelpProps> = (
  props: WallOfShameHelpProps
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
        <IonRow slot='start'>
          <IonText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
          >
            Wall of Shame
          </IonText>
        </IonRow>
        <IonButton
          mode='ios'
          fill='solid'
          color='secondary'
          shape='round'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          onClick={nextPage}
        >
          <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
            Finish
          </IonText>
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default WallOfShameHelp;
