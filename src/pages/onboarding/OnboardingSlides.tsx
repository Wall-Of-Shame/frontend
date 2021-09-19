/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import "./Onboarding.scss";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import "./OnboardingSlides.scss";
import { auth } from "../../firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

interface OnboardingSlidesProps {
  initSwiper: (this: any) => Promise<void>;
  setShowSignUpModal: (showModal: boolean) => void;
  setShowLoginModal: (showModal: boolean) => void;
  swiperCallback: () => void;
}

const OnboardingSlides: React.FC<OnboardingSlidesProps> = ({
  initSwiper,
  setShowSignUpModal,
  setShowLoginModal,
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

  auth.onAuthStateChanged(function (user) {
    // console.log(user);
  });

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
            <IonButton
              expand='block'
              fill='solid'
              shape='round'
              color='quaternary'
              style={{ margin: "1rem" }}
              onClick={() => {
                signInWithPopup(auth, googleProvider)
                  .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                      GoogleAuthProvider.credentialFromResult(result)!;
                    const token = credential.accessToken;
                    console.log(credential);

                    // The signed-in user info.
                    const user = result.user;
                    // ...
                    result.user.getIdToken().then((token) => {
                      console.log(token);
                    });
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                      GoogleAuthProvider.credentialFromError(error);
                    // ...
                  });
              }}
            >
              <IonIcon src={logoGoogle} />
              &nbsp;&nbsp;Continue with Google
            </IonButton>
            <IonButton
              expand='block'
              fill='solid'
              shape='round'
              color='tertiary'
              style={{ margin: "1rem" }}
              onClick={() => {
                console.log("Sign in");
                // signInWithRedirect(auth, facebookProvider);

                signInWithPopup(auth, facebookProvider)
                  .then(async (result) => {
                    console.log("WTF");
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user);
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    const credential =
                      FacebookAuthProvider.credentialFromResult(result)!;
                    const accessToken = credential.accessToken;
                    try {
                      console.log(await user.getIdToken());
                    } catch (error) {}
                    // ...
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                      FacebookAuthProvider.credentialFromError(error);

                    // ...
                  });
              }}
            >
              <IonIcon src={logoFacebook} />
              &nbsp;&nbsp;Continue with FaceBook
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
              Create New Account
            </IonButton>
            <IonRow class='ion-justify-content-center'>
              <IonText class='ion-text-center' color='medium'>
                Have an account?&nbsp;
                <Link
                  to={"#"}
                  style={{ textDecoration: "none", color: "#000" }}
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
