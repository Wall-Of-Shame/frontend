import { IonModal } from "@ionic/react";
import { useReducer, useState } from "react";
import store from "../../../app/store";
import "./SignUpModal.scss";
import PersonalDetails from "./PersonalDetails";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import EmailVerification from "./EmailVerification";
import ProfileSetUp from "./ProfileSetUp";
import { setUser } from "../../../reducers/MiscDux";
import LoadingSpinner from "../../../components/loadingSpinner";

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
            state={state}
            setState={setState}
            completionCallback={() => {
              setState({
                email: "",
                password: "",
                passwordConfirmation: "",
                displayName: "",
                username: "",
              });
              setShowModal(false);
              setTimeout(() => {
                setAnimationDirection("left");
                setPageNumber(0);
              }, 300);
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
    </IonModal>
  );
};

export default SignUpModal;
