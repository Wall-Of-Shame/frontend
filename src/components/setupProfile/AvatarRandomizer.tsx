import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import "./ProfileSetUpModal.scss";
import Container from "../container";
import "../../theme/transitions.scss";
import { ProfileSetUpModalState } from "./ProfileSetUpModal";
import { arrowBackOutline, dice } from "ionicons/icons";

interface AvatarRandomizerProps {
  state: ProfileSetUpModalState;
  setState: React.Dispatch<Partial<ProfileSetUpModalState>>;
  completionCallback: () => void;
  prevPage: () => void;
}

const AvatarRandomizer: React.FC<AvatarRandomizerProps> = (
  props: AvatarRandomizerProps
) => {
  const { completionCallback, prevPage } = props;

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
            Roll for an avatar!
          </IonText>
        </IonRow>
        <IonRow slot='start' style={{ textAlign: "left", margin: "1rem" }}>
          <IonText>
            This little guy will be representing you in your journey of
            self-discovery
          </IonText>
        </IonRow>
        <IonButton
          shape='round'
          color='medium'
          fill='outline'
          style={{ marginTop: "15rem" }}
        >
          <IonIcon icon={dice} color='dark' style={{ marginRight: "0.5rem" }} />
          <IonText color='dark'>Gimme another one</IonText>
        </IonButton>
        <IonButton
          fill='solid'
          shape='round'
          color='secondary'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          onClick={completionCallback}
        >
          &nbsp;&nbsp;Get Started&nbsp;&nbsp;
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default AvatarRandomizer;
