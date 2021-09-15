/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import useInterval from "../../hooks/useInterval";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { logoGoogle, logoFacebook, add } from "ionicons/icons";

import "./Onboarding.scss";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Container from "../../components/container/Container";
import OnboardingSlides from "./OnboardingSlides";
import SignUpModal from "./signup/SignUpModal";

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
  const history = useHistory();
  const { login } = useAuth();
  const slides = useRef(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [swiper, setSwiper] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(false);

  const addMessages = () => {
    var newMessages = [...messages];
    if (newMessages.length > 10) {
      newMessages = newMessages.slice(0, 10);
    }
    setMessages([`${count}`, ...newMessages]);
    setCount(count + 1);
  };

  useInterval(() => {
    // Update wall
    console.log(swiper.activeIndex);
  }, 1500);

  const initSwiper = async function (this: any) {
    setSwiper(await this.getSwiper());
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <OnboardingSlides
          initSwiper={initSwiper}
          setShowModal={setShowModal}
          swiperCallback={() => {
            if (swiper) {
              setCompleted(swiper.activeIndex === 3);
            }
          }}
        />
        <IonFab
          vertical='top'
          horizontal='end'
          slot='fixed'
          style={{ margin: "1rem", opacity: completed ? 0 : 1 }}
          className='skip-button'
        >
          <IonButton
            color='medium'
            fill='clear'
            onClick={() => {
              if (swiper) {
                swiper.slideTo(3);
              }
            }}
          >
            Skip
          </IonButton>
        </IonFab>
        <SignUpModal showModal={showModal} setShowModal={setShowModal} />
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
