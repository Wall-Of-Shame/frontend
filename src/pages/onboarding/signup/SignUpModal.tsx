import { IonModal } from "@ionic/react";
import { useState } from "react";
import store from "../../../app/store";
import "./SignUpModal.scss";
import PersonalDetails from "./PersonalDetails";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import EmailVerification from "./EmailVerification";
import ProfileSetUp from "./ProfileSetUp";
import { setUser } from "../../../reducers/MiscDux";

interface SignUpModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = (props: SignUpModalProps) => {
  const { showModal, setShowModal } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("left");

  const renderPage = () => {
    switch (pageNumber) {
      case 0:
        return (
          <PersonalDetails
            setShowModal={setShowModal}
            nextPage={() => {
              setAnimationDirection("left");
              setPageNumber(1);
            }}
          />
        );
      case 1:
        return (
          <EmailVerification
            nextPage={() => {
              setAnimationDirection("left");
              setPageNumber(2);
            }}
            prevPage={() => {
              setAnimationDirection("right");
              setPageNumber(0);
            }}
          />
        );
      case 2:
        return (
          <ProfileSetUp
            completionCallback={() => {
              setShowModal(false);
              store.dispatch(
                setUser({
                  username: "asthenosphere",
                  name: "Wang Luo",
                  discardedAt: null,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  id: 1,
                })
              );
            }}
            prevPage={() => {
              setAnimationDirection("right");
              setPageNumber(1);
            }}
          />
        );
    }
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
    >
      <TransitionGroup className={"wrapper-" + animationDirection}>
        <CSSTransition key={pageNumber} classNames='slide' timeout={350}>
          <div className='animating' key={pageNumber}>
            {renderPage()}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </IonModal>
  );
};

export default SignUpModal;
