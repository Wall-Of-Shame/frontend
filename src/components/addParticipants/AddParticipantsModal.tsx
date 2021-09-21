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
  IonItemDivider,
  IonItem,
  IonCol,
  IonAvatar,
  IonGrid,
} from "@ionic/react";
import "./AddParticipantsModal.scss";
import LoadingSpinner from "../loadingSpinner";
import { Avatar, Settings } from "../../interfaces/models/Users";
import { useState } from "react";
import yoda from "../../assets/avatar-yoda.png";
import rey from "../../assets/avatar-rey.png";
import poe from "../../assets/avatar-poe.png";
import luke from "../../assets/avatar-luke.png";

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
      cssClass='modal-container'
    >
      <IonHeader translucent>
        <IonToolbar className='modal-search'>
          <IonSearchbar
            key='modal-search'
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder='Search for a name or username'
            showCancelButton='never'
            className='ion-margin-top'
            color='white'
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className='ion-margin-top'>
          <IonText
            className='ion-margin'
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            Recents
          </IonText>

          <IonRow className='ion-margin'>
            <IonCol className='ion-align-item-center' size='3'>
              <IonAvatar className='user-avatar'>
                <img src={luke} alt='user1' />
              </IonAvatar>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              size='6'
            >
              <IonRow style={{ paddingBottom: "0.5rem" }}>
                <IonText style={{ fontSize: 17, fontWeight: 600 }}>yy</IonText>
              </IonRow>
              <IonRow>@rollrollfaraway</IonRow>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              size='3'
            >
              <IonButton
                shape='round'
                color='secondary'
                fill='solid'
                style={{ height: "2.5rem", width: "4.5rem" }}
              >
                <IonText
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Invite
                </IonText>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className='ion-margin'>
            <IonCol className='ion-align-item-center' size='3'>
              <IonAvatar className='user-avatar'>
                <img src={poe} alt='user1' />
              </IonAvatar>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              size='6'
            >
              <IonRow style={{ paddingBottom: "0.5rem" }}>
                <IonText style={{ fontSize: 17, fontWeight: 600 }}>
                  Hanming Zhu
                </IonText>
              </IonRow>
              <IonRow>@hansumkia</IonRow>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              size='3'
            >
              <IonButton
                shape='round'
                color='quinary'
                fill='solid'
                style={{ height: "2.5rem", width: "4.5rem" }}
              >
                <IonText
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Joined
                </IonText>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className='ion-margin'>
            <IonCol className='ion-align-item-center' size='3'>
              <IonAvatar className='user-avatar'>
                <img src={rey} alt='user1' />
              </IonAvatar>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              size='6'
            >
              <IonRow style={{ paddingBottom: "0.5rem" }}>
                <IonText style={{ fontSize: 17, fontWeight: 600 }}>
                  James Tan
                </IonText>
              </IonRow>
              <IonRow>@iamajamestan</IonRow>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              size='3'
            >
              <IonButton
                shape='round'
                color='tertiary'
                fill='solid'
                style={{ height: "2.5rem", width: "4.5rem" }}
              >
                <IonText
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Invited
                </IonText>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow className='ion-justify-content-around'>
            <IonButton
              color='danger'
              shape='round'
              onClick={() => setShowModal(false)}
              style={{ color: "black" }}
            >
              <IonText
                style={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  fontSize: 19,
                }}
              >
                Cancel
              </IonText>
            </IonButton>
            <IonButton
              color='secondary'
              shape='round'
              onClick={() => setShowModal(false)}
              style={{ color: "black" }}
            >
              <IonText
                style={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  fontSize: 19,
                }}
              >
                Confirm
              </IonText>
            </IonButton>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default AddParticipantsModal;
