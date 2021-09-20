import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonSearchbar,
  IonFooter,
  IonRow,
  IonText,
} from "@ionic/react";
import "./AddParticipantsModal.scss";
import LoadingSpinner from "../loadingSpinner";
import { Avatar, Settings } from "../../interfaces/models/Users";
import { useState } from "react";

interface AddParticipantsModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = (props) => {
  const { showModal, setShowModal } = props;
  const [searchText, setSearchText] = useState("");

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
      cssClass="modal-container"
    >
      <IonHeader translucent>
        <IonToolbar className="toolbar">
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Filter Schedules"
            showCancelButton="never"
            className="ion-margin-top"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>hi</div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow className="ion-justify-content-center ion-margin">
            <IonButton
              shape="round"
              color="secondary"
              fill="solid"
              style={{ height: "3.2rem" }}
            >
              <IonText
                style={{
                  marginLeft: "2rem",
                  marginRight: "2rem",
                  fontSize: 19,
                }}
              >
                Share link
              </IonText>
            </IonButton>
          </IonRow>
          <IonButton
            color="white"
            expand="full"
            onClick={() => setShowModal(false)}
            style={{ color: "black" }}
          >
            <IonText
              style={{
                marginLeft: "2rem",
                marginRight: "2rem",
                fontSize: 19,
              }}
            >
              Cancel
            </IonText>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default AddParticipantsModal;
