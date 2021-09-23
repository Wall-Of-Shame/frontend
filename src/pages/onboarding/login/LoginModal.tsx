import {
  IonContent,
  IonFab,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
  IonList,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import Container from "../../../components/container";
import { useReducer, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";
import { isValidEmail } from "../../../utils/ProfileUtils";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface LoginModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface LoginModalState {
  email: string;
  password: string;
  hasError: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
  const { showModal, setShowModal } = props;
  const { login, resetPassword } = useAuth();
  const [pageNumber, setPageNumber] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("left");

  const [state, setState] = useReducer(
    (s: LoginModalState, a: Partial<LoginModalState>) => ({
      ...s,
      ...a,
    }),
    {
      email: "",
      password: "",
      hasError: false,
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

  const handleLogin = async () => {
    // API call to login and refresh app
    setState({ isLoading: true });
    login(state.email, state.password)
      .then(() => {
        setState({ isLoading: false });
        window.location.reload();
      })
      .catch((error) => {
        setState({
          isLoading: false,
          showAlert: true,
          alertHeader: "Ooooops",
          alertMessage:
            "Our server does not recognise your email or password, try again?",
        });
      });
  };

  const handleResetPassword = async () => {
    setState({ isLoading: true });
    try {
      await resetPassword(state.email);
      setState({
        isLoading: false,
        showAlert: true,
        alertHeader: "Success",
        alertMessage: `An password reset email has been sent to ${state.email}. Follow instructions there to reset your password :)`,
      });
    } catch (error) {
      setState({
        isLoading: false,
        hasConfirm: false,
        alertHeader: "Ooooops",
        alertMessage: "Our server is taking a break, come back later please :)",
        showAlert: true,
      });
    }
  };

  const renderPage = () => {
    switch (pageNumber) {
      case 0:
        return (
          <IonContent fullscreen>
            <IonFab
              horizontal='start'
              vertical='top'
              style={{ marginTop: "1rem" }}
            >
              <IonIcon
                icon={arrowBackOutline}
                size='large'
                onClick={() => {
                  setAnimationDirection("left");
                  setShowModal(false);
                }}
              />
            </IonFab>
            <Container>
              <IonRow slot='start'>
                <IonText
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    marginLeft: "1rem",
                  }}
                >
                  Log in
                </IonText>
              </IonRow>
              <IonList className='ion-padding-vertical'>
                <IonItem lines='full'>
                  <IonLabel
                    color={
                      state.email !== "" && !isValidEmail(state.email)
                        ? "danger"
                        : "primary"
                    }
                    position='floating'
                  >
                    Email*
                  </IonLabel>
                  <IonInput
                    name='name'
                    type='email'
                    value={state.email}
                    autocapitalize='on'
                    required
                    onIonChange={(event: CustomEvent) => {
                      setState({ email: event.detail.value });
                    }}
                  />
                </IonItem>
                <IonItem lines='full'>
                  <IonLabel color='primary' position='floating'>
                    Password*
                  </IonLabel>
                  <IonInput
                    name='name'
                    type='password'
                    value={state.password}
                    required
                    onIonChange={(event: CustomEvent) => {
                      setState({ password: event.detail.value });
                    }}
                  />
                </IonItem>
              </IonList>
              <IonRow
                className='ion-justify-content-center'
                style={{ marginTop: "0.5rem" }}
              >
                <IonText
                  className='ion-text-center'
                  color='medium'
                  id='login-options-button-text'
                >
                  Forgot your password?&nbsp;
                  <Link
                    to={"#"}
                    color='primary'
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      setAnimationDirection("left");
                      setPageNumber(1);
                    }}
                  >
                    <IonText style={{ fontWeight: "bold" }}>Reset</IonText>
                  </Link>
                </IonText>
              </IonRow>
              <IonButton
                fill='solid'
                shape='round'
                color='secondary'
                className='ion-padding-horizontal'
                style={{ marginTop: "2rem" }}
                onClick={handleLogin}
                disabled={state.email === "" || state.password === ""}
              >
                <IonText
                  style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                >
                  Let's Go
                </IonText>
              </IonButton>
            </Container>
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
        );
      case 1:
        return (
          <IonContent fullscreen>
            <IonFab
              horizontal='start'
              vertical='top'
              style={{ marginTop: "1rem" }}
            >
              <IonIcon
                icon={arrowBackOutline}
                size='large'
                onClick={() => {
                  setAnimationDirection("right");
                  setPageNumber(0);
                }}
              />
            </IonFab>
            <Container>
              <IonRow slot='start'>
                <IonText
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    marginLeft: "1rem",
                  }}
                >
                  Reset password
                </IonText>
              </IonRow>
              <IonList className='ion-padding-vertical'>
                <IonItem lines='full'>
                  <IonLabel
                    color={
                      state.email !== "" && !isValidEmail(state.email)
                        ? "danger"
                        : "primary"
                    }
                    position='floating'
                  >
                    Email*
                  </IonLabel>
                  <IonInput
                    name='name'
                    type='email'
                    value={state.email}
                    autocapitalize='on'
                    required
                    onIonChange={(event: CustomEvent) => {
                      setState({ email: event.detail.value });
                    }}
                  />
                </IonItem>
              </IonList>
              <IonButton
                fill='solid'
                shape='round'
                color='secondary'
                className='ion-padding-horizontal'
                style={{ marginTop: "2rem" }}
                onClick={handleResetPassword}
                disabled={state.email === ""}
              >
                <IonText
                  style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                >
                  Send password reset email
                </IonText>
              </IonButton>
            </Container>
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

export default LoginModal;
