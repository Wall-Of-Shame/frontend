import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import Container from "../../../components/container";
import { useAuth } from "../../../contexts/AuthContext";
import { SignUpModalState } from "./SignUpModal";

interface EmailVerificationProps {
  state: SignUpModalState;
  setState: React.Dispatch<Partial<SignUpModalState>>;
  nextPage: () => void;
  prevPage: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = (
  props: EmailVerificationProps
) => {
  const { state, setState, nextPage, prevPage } = props;
  const { getFirebaseUser, refreshFirebaseUser, resendVerificationEmail } =
    useAuth();

  const handleContinue = async () => {
    setState({ isLoading: true });
    refreshFirebaseUser().then(() => {
      setState({ isLoading: false });
      const user = getFirebaseUser();
      console.log(user);
      if (user?.emailVerified) {
        nextPage();
      } else {
        setState({
          isLoading: false,
          showAlert: true,
          alertHeader: "Ooooops",
          alertMessage:
            "Seems like you have not verified your email 😅, maybe check your inbox again?",
        });
      }
    });
  };

  const handleResendEmail = async () => {
    setState({ isLoading: true });
    resendVerificationEmail().then(() => {
      setState({ isLoading: false });
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
        <IonRow slot='start' style={{ marginBottom: "2rem" }}>
          <IonText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            Welcome!
          </IonText>
        </IonRow>
        <IonRow
          slot='start'
          style={{ textAlign: "left", marginBottom: "1rem" }}
        >
          <IonText
            style={{
              fontSize: "18px",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            Thanks for signing up! We have sent an email to{" "}
            <IonText style={{ fontWeight: "bold" }}>{state.email}</IonText>
          </IonText>
        </IonRow>
        <IonRow slot='start' style={{ textAlign: "left" }}>
          <IonText
            style={{
              fontSize: "18px",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            Click on the link in the verification email to complete your
            registration
          </IonText>
        </IonRow>
        <IonButton
          expand='block'
          fill='solid'
          shape='round'
          color='secondary'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          onClick={handleContinue}
        >
          Continue
        </IonButton>
        <IonRow
          class='ion-justify-content-center'
          style={{ marginTop: "1rem" }}
        >
          <IonText class='ion-text-center' color='medium'>
            Did not receive the email?&nbsp;
            <Link
              to={"#"}
              style={{ textDecoration: "none" }}
              onClick={handleResendEmail}
            >
              <IonText style={{ fontWeight: "bold" }}>Resend</IonText>
            </Link>
          </IonText>
        </IonRow>
      </Container>
    </IonContent>
  );
};

export default EmailVerification;
