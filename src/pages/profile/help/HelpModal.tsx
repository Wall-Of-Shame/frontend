import { IonModal } from "@ionic/react";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ChallengeHelp from "./ChallengeHelp";
import WallOfShameHelp from "./WallOfShameHelp";

interface HelpModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const HelpModal: React.FC<HelpModalProps> = (props: HelpModalProps) => {
  const { showModal, setShowModal } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("left");

  const renderPage = () => {
    switch (pageNumber) {
      case 0:
        return (
          <ChallengeHelp
            nextPage={() => {
              setAnimationDirection("left");
              setPageNumber(1);
            }}
            prevPage={() => {
              setAnimationDirection("left");
              setShowModal(false);
            }}
          />
        );
      case 1:
        return (
          <WallOfShameHelp
            nextPage={() => {
              setAnimationDirection("left");
              setShowModal(false);
            }}
            prevPage={() => {
              setAnimationDirection("right");
              setPageNumber(0);
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

export default HelpModal;
