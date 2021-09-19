/* eslint-disable @typescript-eslint/no-unused-vars */
import { IonButton, IonContent, IonFab, IonPage } from "@ionic/react";
import React, { useState } from "react";

import "./Onboarding.scss";
import OnboardingSlides from "./OnboardingSlides";
import SignUpModal from "./signup/SignUpModal";
import LoginModal from "./login/LoginModal";

const Onboarding: React.FC = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [completed, setCompleted] = useState(false);

  const initSwiper = async function (this: any) {
    setSwiper(await this.getSwiper());
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <OnboardingSlides
          initSwiper={initSwiper}
          setShowSignUpModal={setShowSignUpModal}
          setShowLoginModal={setShowLoginModal}
          swiperCallback={() => {
            if (swiper) {
              const didComplete = swiper.activeIndex === 3;
              setCompleted(didComplete);
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
        <SignUpModal
          showModal={showSignUpModal}
          setShowModal={setShowSignUpModal}
        />
        <LoginModal
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
