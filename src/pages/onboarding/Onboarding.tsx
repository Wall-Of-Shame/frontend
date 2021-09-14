/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
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
import OnboardingSlides from "./OnboardingSlides";

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
      <IonContent fullscreen scrollY={false}>
        <OnboardingSlides />
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
