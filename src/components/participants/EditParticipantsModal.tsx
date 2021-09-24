import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonRow,
  IonText,
  IonCol,
  IonAvatar,
  IonGrid,
  IonIcon,
  IonInput,
} from "@ionic/react";
import "./EditParticipantsModal.scss";
import { useCallback, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { addOutline, removeOutline, searchOutline } from "ionicons/icons";
import { UserMini } from "../../interfaces/models/Challenges";
import AvatarImg from "../avatar";
import lodash from "lodash";

interface EditParticipantsModalProps {
  accepted: UserMini[];
  pending: UserMini[];
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  completionCallback: (invitedUsers: UserMini[]) => void;
}

const EditParticipantsModal: React.FC<EditParticipantsModalProps> = (props) => {
  const { pending, showModal, setShowModal, completionCallback } = props;
  const { searchUser } = useUser();
  const [searchText, setSearchText] = useState("");
  const [matchedUsers, setMatchedUsers] = useState<UserMini[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<UserMini[]>(pending);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    lodash.debounce((e) => {
      handleSearch(e);
    }, 250),
    []
  );

  const handleSearch = async (searchText: string) => {
    if (searchText.length <= 0) {
      setMatchedUsers([]);
      return;
    }
    try {
      const response = await searchUser(searchText);
      setMatchedUsers(
        response.map((u) => {
          return {
            name: u.name,
            username: u.username,
            avatar: u.avatar,
            hasBeenVetoed: false,
            userId: u.userId,
          };
        })
      );
    } catch (error) {}
  };

  const handleInvite = (user: UserMini) => {
    const index = invitedUsers.indexOf(user);
    if (index !== -1) {
      var newInvitedUsers = invitedUsers.slice(0);
      newInvitedUsers = invitedUsers.filter((u) => u.userId !== user.userId);
      setInvitedUsers(newInvitedUsers);
    } else {
      const newInvitedUsers = invitedUsers.slice(0);
      newInvitedUsers.push(user);
      setInvitedUsers(newInvitedUsers);
    }
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={false}
      cssClass='modal-container'
    >
      <IonHeader>
        <IonRow style={{ margin: "0.5rem" }} className='ion-align-items-center'>
          <IonIcon
            icon={searchOutline}
            style={{
              marginRight: "0.5rem",
              marginLeft: "0.5rem",
              fontSize: "1.25rem",
            }}
          />
          <IonInput
            value={searchText}
            placeholder='Search for a name or username'
            onIonChange={(e) => {
              setSearchText(e.detail.value ?? "");
              debouncedSearch(e.detail.value ?? "");
            }}
          />
        </IonRow>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className='ion-margin-top'>
          <IonText
            className='ion-margin'
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            Search results
          </IonText>
          {matchedUsers.map((u) => {
            return (
              <IonRow className='ion-margin' key={u.userId}>
                <IonCol className='ion-align-item-center' size='3'>
                  <IonAvatar className='user-avatar'>
                    <AvatarImg avatar={u.avatar} />
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
                      {u.name}
                    </IonText>
                  </IonRow>
                  <IonRow>{`@${u.username}`}</IonRow>
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
                    mode='ios'
                    shape='round'
                    color={
                      invitedUsers.indexOf(u) !== -1 ? "quinary" : "quaternary"
                    }
                    fill='solid'
                    style={{ height: "2.5rem", width: "4.5rem" }}
                    onClick={() => handleInvite(u)}
                  >
                    <IonIcon
                      icon={
                        invitedUsers.indexOf(u) !== -1
                          ? removeOutline
                          : addOutline
                      }
                    />
                  </IonButton>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
        <IonGrid className='ion-margin-top'>
          {invitedUsers.length > 0 && (
            <IonText
              className='ion-margin'
              style={{ fontSize: 17, fontWeight: 600 }}
            >
              Added users
            </IonText>
          )}
          {invitedUsers.map((u) => {
            return (
              <IonRow className='ion-margin' key={u.username}>
                <IonCol className='ion-align-item-center' size='3'>
                  <IonAvatar className='user-avatar'>
                    <AvatarImg avatar={u.avatar} />
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
                      {u.name}
                    </IonText>
                  </IonRow>
                  <IonRow>{`@${u.username}`}</IonRow>
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
                    mode='ios'
                    shape='round'
                    color='tertiary'
                    fill='solid'
                    style={{ height: "2.5rem", width: "4.5rem" }}
                    onClick={() => handleInvite(u)}
                  >
                    <IonIcon icon={removeOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow
            className='ion-justify-content-around'
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            <IonButton
              mode='ios'
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
              mode='ios'
              color='secondary'
              shape='round'
              onClick={() => completionCallback(invitedUsers)}
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

export default EditParticipantsModal;
