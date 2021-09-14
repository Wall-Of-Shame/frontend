/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import useInterval from "../../hooks/useInterval";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { logoGoogle, logoFacebook } from "ionicons/icons";

import "./Onboarding.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Container from "../../components/container/Container";

interface MessagesProps {
  messages: string[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className='messagesWrapper'>
      {messages.map((message) => (
        <IonRow key={message} className='ion-justify-content-center'>
          {`Someone has failed ${message} just now`}
        </IonRow>
      ))}
    </div>
  );
};

const Onboarding: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const history = useHistory();
  const { login } = useAuth();
  const addMessages = () => {
    var newMessages = [...messages];
    if (newMessages.length > 10) {
      newMessages = newMessages.slice(0, 10);
    }
    setMessages([`${count}`, ...newMessages]);
    setCount(count + 1);
  };

  useInterval(() => {
    addMessages();
  }, 500);

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  const responseFacebook = (response: any) => {
    console.log(response);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
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
                fill='outline'
                onClick={renderProps.onClick}
                style={{ margin: "1rem", color: "#000000" }}
                color='white'
              >
                <IonIcon src={logoGoogle} />
                &nbsp;&nbsp;Continue with Google
              </IonButton>
            )}
            buttonText='Login'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId='555300749049260'
            autoLoad={false}
            callback={responseFacebook}
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
            onClick={() => {
              history.push("signup");
            }}
          >
            Create New Account
          </IonButton>
          <IonRow class='ion-justify-content-center'>
            <IonText class='ion-text-center' color='medium'>
              Have an account?&nbsp;
              <Link to={"/challenges"} style={{ textDecoration: "none" }}>
                <IonText style={{ fontWeight: "bold" }}>Log in</IonText>
              </Link>
            </IonText>
          </IonRow>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
