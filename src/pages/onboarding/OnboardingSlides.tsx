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
      className="slides"
      onIonSlidesDidLoad={initSwiper}
      onIonSlideDidChange={swiperCallback}
    >
      <IonSlide>
        <div className="slide">
          <Container>
            <img src={challenge} alt="challenge" />
            <h1>Create a Challenge</h1>
            <br />
            <p>
              Can’t seem to stop procrastinating?
              <br />
              Create a challenge and set a deadline for your task!
            </p>
            <IonRow
              className="ion-justify-content-center"
              style={{ marginTop: "2rem" }}
            >
              <IonButton
                color="secondary"
                shape="round"
                fill="solid"
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
          <img src={invite} alt="invite" />
          <h1>Invite your friends</h1>
          <br />
          <p>Why suffer alone? Invite your friends to join the challenge!</p>
          <IonRow
            className="ion-justify-content-center"
            style={{ marginTop: "2rem" }}
          >
            <IonButton
              color="secondary"
              shape="round"
              fill="solid"
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
        <div className="slide">
          <Container>
            <h2>To the WALL OF SHAME</h2>
            <br />
            <p>
              Losers of the challenge get thrown to the wall, where their names
              will be for all to see!
            </p>
            <IonRow
              className="ion-justify-content-center"
              style={{ marginTop: "2rem" }}
            >
              <IonButton
                color="secondary"
                shape="round"
                fill="solid"
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
        <div className="slide">
          <Container>
            <img src={highground} alt="highground" />
            <IonRow class="ion-justify-content-center ion-padding-horizontal">
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bolder",
                  marginTop: "0px",
                }}
              >
                WALL OF SHAME
              </h1>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              Take the moral highground.
            </IonRow>
            <br />
            {/*
        <div style={{ height: "30%", overflow: "scroll" }} id={"rolling-list"}>
          <Messages messages={messages} />
        </div>
        */}
            <IonButton
              expand="block"
              fill="solid"
              shape="round"
              color="quaternary"
              style={{ margin: "1rem" }}
              onClick={async () => {
                continueWithGoogle()
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                    setState({
                      showAlert: true,
                      alertHeader: "Ooooops",
                      alertMessage:
                        "Our server is taking a break, come back later please :)",
                    });
                  });
              }}
            >
              <IonIcon src={logoGoogle} />
              &nbsp;&nbsp;Continue with Google
            </IonButton>
            <IonButton
              expand="block"
              fill="solid"
              shape="round"
              color="tertiary"
              style={{ margin: "1rem" }}
              onClick={async () => {
                continueWithFacebook()
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                    setState({
                      showAlert: true,
                      alertHeader: "Ooooops",
                      alertMessage:
                        "Our server is taking a break, come back later please :)",
                    });
                  });
              }}
            >
              <IonIcon src={logoFacebook} />
              &nbsp;&nbsp;Continue with FaceBook
            </IonButton>
            <div style={{ margin: "1.5rem" }}>
              <h4 className="separator">
                <span>OR</span>
              </h4>
            </div>
            <IonButton
              expand="block"
              fill="solid"
              color="quinary"
              shape="round"
              style={{ margin: "1rem" }}
              onClick={() => setShowSignUpModal(true)}
            >
              Create New Account
            </IonButton>
            <IonRow class="ion-justify-content-center">
              <IonText class="ion-text-center" color="medium">
                Have an account?&nbsp;
                <Link
                  to={"#"}
                  color="primary"
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
