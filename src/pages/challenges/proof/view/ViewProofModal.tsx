import {
  IonContent,
  IonFab,
  IonIcon,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import Container from "../../../../components/container";
import "./ViewProofModal.scss";
import { UserMini } from "../../../../interfaces/models/Challenges";

interface ViewProofModalProps {
  userData: UserMini | undefined;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const ViewProofModal: React.FC<ViewProofModalProps> = (
  props: ViewProofModalProps
) => {
  const { userData, showModal, setShowModal } = props;

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
    >
      <IonContent fullscreen>
        <IonFab
          horizontal='start'
          vertical='top'
          style={{ marginTop: "1rem", marginLeft: "1rem" }}
        >
          <IonIcon
            icon={arrowBackOutline}
            size='large'
            onClick={() => {
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
                marginBottom: "1rem",
              }}
            >
              {`${userData?.name}'s proof`}
            </IonText>
          </IonRow>
          <IonRow className='ion-justify-content-center ion-margin-top'>
            <img src={userData?.evidenceLink} alt='Proof' />
          </IonRow>
        </Container>
      </IonContent>
    </IonModal>
  );
};

export default ViewProofModal;
