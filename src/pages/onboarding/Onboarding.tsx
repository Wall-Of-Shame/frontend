/* eslint-disable @typescript-eslint/no-unused-vars */
import { IonButton, IonContent, IonFab, IonIcon, IonPage } from "@ionic/react";
import React, { useReducer, useState } from "react";

import "./Onboarding.scss";
import OnboardingSlides from "./OnboardingSlides";
import SignUpModal from "./signup/SignUpModal";
import LoginModal from "./login/LoginModal";
import { arrowBackOutline } from "ionicons/icons";
import LoadingSpinner from "../../components/loadingSpinner";
import Alert from "../../components/alert";

export interface OnboardingState {
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const Onboarding: React.FC = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [completed, setCompleted] = useState(false);

  const [state, setState] = useReducer(
    (s: OnboardingState, a: Partial<OnboardingState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: false,
      showAlert: false,
      alertHeader: "",
      alertMessage: "",
      hasConfirm: false,
      confirmHandler: () => {},
      cancelHandler: () => {},
      okHandler: undefined,
    }
  );

  const initSwiper = async function (this: any) {
    setSwiper(await this.getSwiper());
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <IonFab
          horizontal='start'
          vertical='top'
          style={{
            marginTop: "1.75rem",
            marginLeft: "0.5rem",
            opacity: atStart ? 0 : 1,
          }}
          className='control-button'
        >
          <IonIcon
            icon={arrowBackOutline}
            size='large'
            color='medium'
            onClick={() => {
              if (swiper) {
                swiper.slidePrev();
              }
            }}
          />
        </IonFab>
        <IonFab
          vertical='top'
          horizontal='end'
          slot='fixed'
          style={{ marginTop: "1rem", opacity: completed ? 0 : 1 }}
          className='control-button'
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
        <OnboardingSlides
          initSwiper={initSwiper}
          setShowSignUpModal={setShowSignUpModal}
          setShowLoginModal={setShowLoginModal}
          swipeNext={() => {
            if (swiper) {
              swiper.slideNext();
            }
          }}
          swiperCallback={() => {
            if (swiper) {
              const activeIndex = swiper.activeIndex;
              setCompleted(activeIndex === 3);
              setAtStart(activeIndex === 0);
            }
          }}
          state={state}
          setState={setState}
        />

        <SignUpModal
          showModal={showSignUpModal}
          setShowModal={setShowSignUpModal}
        />
        <LoginModal
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
        />
        <LoadingSpinner
          loading={state.isLoading}
          message={"Loading"}
          closeLoading={() => {}}
        />
        <Alert
          showAlert={state.showAlert}
          closeAlert={(): void => {
            setState({
              showAlert: false,
            });
          }}
          alertHeader={state.alertHeader}
          alertMessage={state.alertMessage}
          hasConfirm={state.hasConfirm}
          confirmHandler={state.confirmHandler}
          cancelHandler={state.cancelHandler}
          okHandler={state.okHandler}
        />
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
