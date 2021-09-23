import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
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
      <IonHeader translucent className='ion-no-border'>
        <IonToolbar style={{ marginTop: "1.25rem" }}>
          <IonTitle>{`${userData?.name}'s proof`}</IonTitle>
          <IonButtons slot='start'>
            <IonButton
              onClick={() => setShowModal(false)}
              style={{ marginLeft: "1rem" }}
            >
              <IonIcon icon={arrowBackOutline} size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Container>
          <IonRow className='ion-justify-content-center ion-margin-top'>
            <img
              src={userData?.evidenceLink}
              alt='Proof'
              className='uploaded-proof'
            />
          </IonRow>
        </Container>
      </IonContent>
    </IonModal>
  );
};

export default ViewProofModal;
