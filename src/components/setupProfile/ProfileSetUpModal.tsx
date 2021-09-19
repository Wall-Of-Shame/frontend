import { IonModal } from "@ionic/react";
import { useReducer, useState } from "react";
import "./ProfileSetUpModal.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProfileSetUp from "./ProfileSetUp";
import LoadingSpinner from "../loadingSpinner";
import Alert from "../alert";
import AvatarRandomizer from "./AvatarRandomizer";
import { useUser } from "../../contexts/UserContext";
import { Avatar, Settings } from "../../interfaces/models/Users";

interface ProfileSetUpModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface ProfileSetUpModalState {
  displayName: string;
  username: string;
  settings: Settings;
  avatar: Avatar;
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
  const { updateProfile } = useUser();
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
      settings: {
        deadlineReminder: true,
        invitations: true,
      },
      avatar: {
        animal: "CAT",
        color: "BROWN",
        background: "#cdcdcd",
      },
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

  const handleProfileUpdate = async () => {
    console.log("What");
    setState({ isLoading: true });
    try {
      await updateProfile(
        state.displayName,
        state.username,
        state.settings,
        state.avatar
      );
      setState({ isLoading: false });
      setAnimationDirection("left");
      setPageNumber(1);
    } catch (error) {
      setState({
        isLoading: false,
        showAlert: true,
        alertHeader: "Ooooops",
        alertMessage: "This username is already taken, maybe try another one?",
      });
    }
  };

  const renderPage = () => {
    switch (pageNumber) {
      case 0:
        return (
          <ProfileSetUp
            state={state}
            setState={setState}
            setShowModal={setShowModal}
            completionCallback={handleProfileUpdate}
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
                username: "",
                settings: {
                  deadlineReminder: true,
                  invitations: true,
                },
                avatar: {
                  animal: "CAT",
                  color: "BROWN",
                  background: "#cdcdcd",
                },
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
