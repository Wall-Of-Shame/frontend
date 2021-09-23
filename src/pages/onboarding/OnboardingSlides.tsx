import {
  IonButton,
  IonIcon,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
} from "@ionic/react";
import React from "react";
import { logoGoogle, logoFacebook } from "ionicons/icons";

import "./Onboarding.scss";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import "./OnboardingSlides.scss";
import { useAuth } from "../../contexts/AuthContext";
import { OnboardingState } from "./Onboarding";

import challenge from "../../assets/onboarding/challenge.png";
import invite from "../../assets/onboarding/invite.png";
import highground from "../../assets/onboarding/highground.png";

interface OnboardingSlidesProps {
  initSwiper: (this: any) => Promise<void>;
  setShowSignUpModal: (showModal: boolean) => void;
  setShowLoginModal: (showModal: boolean) => void;
  swipeNext: () => void;
  swiperCallback: () => void;
  state: OnboardingState;
  setState: React.Dispatch<Partial<OnboardingState>>;
}

const OnboardingSlides: React.FC<OnboardingSlidesProps> = ({
  initSwiper,
  setShowSignUpModal,
  setShowLoginModal,
  swipeNext,
  swiperCallback,
  state,
  setState,
}) => {
  const { continueWithGoogle, continueWithFacebook } = useAuth();

  return (
    <IonSlides
      pager={true}
      className='slides'
      onIonSlidesDidLoad={initSwiper}
      onIonSlideDidChange={swiperCallback}
    >
      <IonSlide>
        <div className='slide'>
          <Container>
            <img
              src={challenge}
              alt='challenge'
              style={{ marginBottom: "1rem" }}
            />
            <h1 style={{ marginBottom: "1.5rem" }}>Create a Challenge</h1>
            <p>
              Can’t seem to stop procrastinating?
              <br />
              Create a challenge and set a deadline for your task!
            </p>
            <IonRow
              className='ion-justify-content-center'
              style={{ marginTop: "2rem" }}
            >
              <IonButton
                color='secondary'
                shape='round'
                fill='solid'
                onClick={swipeNext}
              >
                <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                  Next
                </IonText>
              </IonButton>
            </IonRow>
          </Container>
        </div>
      </IonSlide>

      <IonSlide>
        <Container>
          <img
            src={invite}
            alt='invite'
            className='onboarding-image'
            style={{ marginBottom: "1rem" }}
          />
          <h1 style={{ marginBottom: "1.5rem" }}>Invite your friends</h1>
          <p>Why suffer alone? Invite your friends to join the challenge!</p>
          <IonRow
            className='ion-justify-content-center'
            style={{ marginTop: "2rem" }}
          >
            <IonButton
              color='secondary'
              shape='round'
              fill='solid'
              onClick={swipeNext}
            >
              <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                Next
              </IonText>
            </IonButton>
          </IonRow>
        </Container>
      </IonSlide>

      <IonSlide>
        <div className='slide'>
          <Container>
            <img
              src={highground}
              alt='highground'
              style={{ marginBottom: "0rem" }}
            />
            <h2 style={{ marginBottom: "1.5rem" }}>To the WALL OF SHAME</h2>
            <p>
              Losers of the challenge get thrown to the wall, where their names
              will be for all to see!
            </p>
            <IonRow
              className='ion-justify-content-center'
              style={{ marginTop: "2rem" }}
            >
              <IonButton
                color='secondary'
                shape='round'
                fill='solid'
                onClick={swipeNext}
              >
                <IonText style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                  Next
                </IonText>
              </IonButton>
            </IonRow>
          </Container>
        </div>
      </IonSlide>
      <IonSlide>
        <div className='slide'>
          <Container>
            <h1 id='wall-of-shame-header'>WALL OF SHAME</h1>
            <p style={{ marginBottom: "4rem" }}>Take the moral highground.</p>
            <IonButton
              expand='block'
              fill='solid'
              shape='round'
              color='quaternary'
              style={{ margin: "1rem" }}
              onClick={async () => {
                continueWithGoogle(() => {
                  setState({ isLoading: true });
                })
                  .then(() => {
                    setState({ isLoading: false });
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                    setState({
                      isLoading: false,
                      hasConfirm: false,
                      showAlert: true,
                      alertHeader: "Ooooops",
                      alertMessage:
                        "Our server is taking a break, come back later please :)",
                    });
                  });
              }}
            >
              <IonIcon src={logoGoogle} />
              <IonText id='login-options-button-text'>
                &nbsp;&nbsp;Continue with Google
              </IonText>
            </IonButton>
            <IonButton
              expand='block'
              fill='solid'
              shape='round'
              color='tertiary'
              style={{ margin: "1rem" }}
              onClick={async () => {
                continueWithFacebook(() => {
                  setState({ isLoading: true });
                })
                  .then(() => {
                    setState({ isLoading: false });
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                    setState({
                      isLoading: false,
                      hasConfirm: false,
                      showAlert: true,
                      alertHeader: "Ooooops",
                      alertMessage:
                        "Our server is taking a break, come back later please :)",
                    });
                  });
              }}
            >
              <IonIcon src={logoFacebook} />
              <IonText id='login-options-button-text'>
                &nbsp;&nbsp;Continue with FaceBook
              </IonText>
            </IonButton>
            <div style={{ margin: "1.5rem" }}>
              <h4 className='separator'>
                <span>OR</span>
              </h4>
            </div>
            <IonButton
              expand='block'
              fill='solid'
              color='quinary'
              shape='round'
              style={{ margin: "1rem" }}
              onClick={() => setShowSignUpModal(true)}
            >
              <IonText id='login-options-button-text'>
                Create New Account
              </IonText>
            </IonButton>
            <IonRow className='ion-justify-content-center'>
              <IonText
                className='ion-text-center'
                color='medium'
                id='login-options-button-text'
              >
                Have an account?&nbsp;
                <Link
                  to={"#"}
                  color='primary'
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setShowLoginModal(true);
                  }}
                >
                  <IonText style={{ fontWeight: "bold" }}>Log in</IonText>
                </Link>
              </IonText>
            </IonRow>
          </Container>
        </div>
      </IonSlide>
    </IonSlides>
  );
};

export default OnboardingSlides;
