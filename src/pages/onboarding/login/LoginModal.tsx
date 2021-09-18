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
import { useReducer } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";
import { isValidEmail } from "../../../utils/ProfileUtils";

interface LoginModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface SignUpModalState {
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
  const { login } = useAuth();

  const [state, setState] = useReducer(
    (s: SignUpModalState, a: Partial<SignUpModalState>) => ({
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

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
    >
      <IonContent fullscreen>
        <IonFab horizontal='start' vertical='top' style={{ marginTop: "1rem" }}>
          <IonIcon
            icon={arrowBackOutline}
            size='large'
            onClick={() => setShowModal(false)}
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
                Email
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
                Password
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
          <IonButton
            expand='block'
            fill='solid'
            shape='round'
            color='secondary'
            className='ion-padding-horizontal'
            style={{ marginTop: "2rem" }}
            onClick={handleLogin}
            disabled={state.email === "" || state.password === ""}
          >
            Let's Go
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
    </IonModal>
  );
};

export default LoginModal;
