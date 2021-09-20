import {
  IonButton,
  IonContent,
  IonFab,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import "./ProfileSetUpModal.scss";
import Container from "../container";
import "../../theme/transitions.scss";
import { ProfileSetUpModalState } from "./ProfileSetUpModal";
import { arrowBackOutline, dice } from "ionicons/icons";
import { AvatarAnimal, AvatarColor } from "../../interfaces/models/Users";

interface AvatarRandomizerProps {
  state: ProfileSetUpModalState;
  setState: React.Dispatch<Partial<ProfileSetUpModalState>>;
  completionCallback: () => void;
  prevPage: () => void;
}

const AvatarRandomizer: React.FC<AvatarRandomizerProps> = (
  props: AvatarRandomizerProps
) => {
  const { state, setState, completionCallback, prevPage } = props;
  const animals = ["CAT", "DOG", "RABBIT"];
  const colors = ["PRIMARY", "SECONDARY", "TERTIARY"];

  const handleRandomize = () => {
    const randomAnimal = animals[
      Math.floor(Math.random() * animals.length)
    ] as AvatarAnimal;
    const randomColor = colors[
      Math.floor(Math.random() * colors.length)
    ] as AvatarColor;
    const randomBackground = Math.floor(Math.random() * 16777215).toString(16);
    setState({
      avatar: {
        animal: randomAnimal,
        color: randomColor,
        background: `#${randomBackground}`,
      },
    });
  };

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
        <IonGrid style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <IonRow className='ion-justify-content-center'>
            {state.avatar.animal}
          </IonRow>
          <IonRow className='ion-justify-content-center'>
            {state.avatar.color}
          </IonRow>
          <IonRow className='ion-justify-content-center'>
            {state.avatar.background}
          </IonRow>
        </IonGrid>
        <IonButton
          shape='round'
          color='medium'
          fill='outline'
          onClick={handleRandomize}
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
          <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
            Get Started
          </IonText>
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default AvatarRandomizer;
