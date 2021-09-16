import {
  IonButton,
  IonIcon,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
} from "@ionic/react";
import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { logoGoogle, logoFacebook } from "ionicons/icons";

import "./Onboarding.scss";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import "./OnboardingSlides.scss";

interface OnboardingSlidesProps {
  initSwiper: (this: any) => Promise<void>;
  setShowModal: (showModal: boolean) => void;
  swiperCallback: () => void;
}

const OnboardingSlides: React.FC<OnboardingSlidesProps> = ({
  initSwiper,
  setShowModal,
  swiperCallback,
}) => {
  const onGoogleLoginSuccess = (response: any) => {
    console.log(response);
  };

  const onGoogleLoginFailure = (response: any) => {
    console.log(response);
  };

  const onFacebookLogin = (response: any) => {
    console.log(response);
  };

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
            <h1>Welcome</h1>
            <br />
            <p>
              The <b>Wall Of Shame</b> is an app for you to achieve your goals
              today... <br /> <b>...by risking your fame 🤪</b>
            </p>
          </Container>
        </div>
      </IonSlide>

      <IonSlide>
        <Container>
          <h1>How to use?</h1>
          <br />
          <p>
            Create a <b>Challenge</b> when you want to see your lazy friends
            getting sentenced to the <b>Wall Of Shame</b> 😍
            <br />
            <br />
            Or
            <br />
            <br />
            When you want to cure your <b>procrastination</b> today 🧐
          </p>
        </Container>
      </IonSlide>

      <IonSlide>
        <div className='slide'>
          <Container>
            <h2>Who should use?</h2>
            <br />
            <p>
              Please <b>DO NOT</b> use this if you are thin-skinned or shy 😅
            </p>
          </Container>
        </div>
      </IonSlide>
      <IonSlide>
        <div className='slide'>
          <Container>
            <IonRow class='ion-justify-content-center ion-no-padding'>
              <h1 style={{ fontSize: "1.25rem", marginBottom: "0px" }}>THE</h1>
            </IonRow>
            <IonRow class='ion-justify-content-center ion-padding-horizontal'>
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
            <br />
            <IonRow class='ion-justify-content-center'>
              Take the moral highground
            </IonRow>
            <br />
            <br />
            {/*
        <div style={{ height: "30%", overflow: "scroll" }} id={"rolling-list"}>
          <Messages messages={messages} />
        </div>
        */}
            <GoogleLogin
              clientId='132816405192-57gfu0ovlrcjjfiitif91biuo74srsff.apps.googleusercontent.com'
              render={(renderProps) => (
                <IonButton
                  expand='block'
                  fill='solid'
                  style={{ margin: "1rem" }}
                  onClick={renderProps.onClick}
                >
                  <IonIcon src={logoGoogle} />
                  &nbsp;&nbsp;Continue with Google
                </IonButton>
              )}
              buttonText='Login'
              onSuccess={onGoogleLoginSuccess}
              onFailure={onGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId='555300749049260'
              autoLoad={false}
              callback={onFacebookLogin}
              render={(renderProps) => (
                <IonButton
                  expand='block'
                  fill='solid'
                  style={{ margin: "1rem" }}
                  onClick={renderProps.onClick}
                >
                  <IonIcon src={logoFacebook} />
                  &nbsp;&nbsp;Continue with FaceBook
                </IonButton>
              )}
            />
            <div style={{ margin: "1.5rem" }}>
              <h4 className='separator'>
                <span>OR</span>
              </h4>
            </div>
            <IonButton
              expand='block'
              fill='solid'
              style={{ margin: "1rem" }}
              onClick={() => setShowModal(true)}
            >
              Create New Account
            </IonButton>
            <IonRow class='ion-justify-content-center'>
              <IonText class='ion-text-center' color='medium'>
                Have an account?&nbsp;
                <Link to={"#"} style={{ textDecoration: "none" }}>
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
