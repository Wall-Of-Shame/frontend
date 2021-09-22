import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import "./VoteModal.scss";
import { arrowBackOutline } from "ionicons/icons";
import yoda from "../../../assets/avatar-yoda.png";
import { UserMini } from "../../../interfaces/models/Challenges";
import { useUser } from "../../../contexts/UserContext";
import { useReducer } from "react";
import LoadingSpinner from "../../../components/loadingSpinner";
import Alert from "../../../components/alert";

interface VoteModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  participantsCount: number;
  participantsCompleted: UserMini[];
}

interface VoteModalState {
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
  okText?: string;
}

const VoteModal: React.FC<VoteModalProps> = (props: VoteModalProps) => {
  const { user } = useUser();
  const { showModal, setShowModal, participantsCompleted, participantsCount } =
    props;

  const [state, setState] = useReducer(
    (s: VoteModalState, a: Partial<VoteModalState>) => ({
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
      okText: undefined,
    }
  );

  const handleVote = (userId: string) => {
    if (userId === user?.userId) {
      setState({
        showAlert: true,
        alertHeader: "Seriously?",
        alertMessage: "You wanna vote yourself to the Wall of Shame? 🌚",
        okText: "Fine",
      });
      return;
    }
  };

  const userCard = (u: UserMini) => (
    <IonCol
      size='6'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
      key={u.username}
    >
      <IonRow className='ion-align-items'>
        <IonAvatar
          className='edit-profile-avatar'
          style={{ marginBottom: "0.75rem" }}
        >
          <img src={yoda} alt='avatar' />
        </IonAvatar>
      </IonRow>
      <IonRow style={{ marginBottom: "0.75rem" }}>
        <IonText style={{ fontWeight: "bold" }}>{u.name}</IonText>
      </IonRow>
      <IonRow style={{ marginBottom: "0.75rem" }}>
        <IonText style={{ fonrtSize: "0.75rem" }}>@{u.username}</IonText>
      </IonRow>
      <IonRow style={{ marginBottom: "0.75rem" }}>
        <IonText>2 votes</IonText>
      </IonRow>
      <IonRow>
        <IonButton
          shape='round'
          color='secondary'
          fill='solid'
          style={{ height: "2.5rem", width: "4.5rem" }}
          onClick={() => handleVote(u.userId)}
        >
          <IonText
            style={{
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {u.userId === user?.userId ? "You" : "Vote"}
          </IonText>
        </IonButton>
      </IonRow>
    </IonCol>
  );

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
        <IonGrid style={{ marginTop: "3.5rem" }}>
          <IonRow className='ion-padding'>
            <IonText style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Vote to banish a cheater to the wall
            </IonText>
          </IonRow>
          <IonRow className='ion-padding-horizontal ion-padding-top'>
            <IonText style={{ fontSize: 17 }}>
              <strong>{participantsCount - 1}</strong>{" "}
              {participantsCount - 1 === 1 ? "person has " : "people have "}
              to vote for a successful shaming 😊
            </IonText>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow className='ion-padding-bottom'>
            {participantsCompleted.map((p) => {
              return userCard(p);
            })}
          </IonRow>
        </IonGrid>
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
          okText={state.okText}
        />
      </IonContent>
    </IonModal>
  );
};

export default VoteModal;
