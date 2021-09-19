import { IonModal } from "@ionic/react";
import { useReducer, useState } from "react";
import "./ProfileSetUpModal.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProfileSetUp from "./ProfileSetUp";
import LoadingSpinner from "../loadingSpinner";
import Alert from "../alert";
import AvatarRandomizer from "./AvatarRandomizer";

interface ProfileSetUpModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface ProfileSetUpModalState {
  displayName: string;
  username: string;
  avatar: string;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const ProfileSetUpModal: React.FC<ProfileSetUpModalProps> = (
  props: ProfileSetUpModalProps
) => {
  const { showModal, setShowModal } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("left");

  const [state, setState] = useReducer(
    (s: ProfileSetUpModalState, a: Partial<ProfileSetUpModalState>) => ({
      ...s,
      ...a,
    }),
    {
      displayName: "",
      username: "",
      avatar: "",
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

  const renderPage = () => {
    switch (pageNumber) {
      case 0:
        return (
          <ProfileSetUp
            state={state}
            setState={setState}
            completionCallback={() => {
              setAnimationDirection("left");
              setPageNumber(1);
            }}
          />
        );
      case 1:
        return (
          <AvatarRandomizer
            state={state}
            setState={setState}
            completionCallback={() => {
              setState({
                displayName: "",
                avatar: "",
                username: "",
              });
              setShowModal(false);
              setTimeout(() => {
                setAnimationDirection("left");
                setPageNumber(0);
              }, 300);
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
    </IonModal>
  );
};

export default ProfileSetUpModal;
