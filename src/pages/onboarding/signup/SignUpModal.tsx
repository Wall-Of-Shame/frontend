import { IonModal } from "@ionic/react";
import { useReducer, useState } from "react";
import "./SignUpModal.scss";
import PersonalDetails from "./PersonalDetails";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import EmailVerification from "./EmailVerification";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";

interface SignUpModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface SignUpModalState {
  email: string;
  password: string;
  passwordConfirmation: string;
  displayName: string;
  username: string;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = (props: SignUpModalProps) => {
  const { showModal, setShowModal } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("left");

  const [state, setState] = useReducer(
    (s: SignUpModalState, a: Partial<SignUpModalState>) => ({
      ...s,
      ...a,
    }),
    {
      email: "",
      password: "",
      passwordConfirmation: "",
      displayName: "",
      username: "",
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
          <PersonalDetails
            state={state}
            setState={setState}
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
            state={state}
            setState={setState}
            nextPage={() => {
              setAnimationDirection("left");
              setShowModal(false);
              window.location.reload();
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

export default SignUpModal;
