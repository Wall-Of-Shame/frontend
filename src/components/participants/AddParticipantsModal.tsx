import {
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonFooter,
  IonRow,
  IonText,
  IonCol,
  IonAvatar,
  IonGrid,
  IonIcon,
} from "@ionic/react";
import "./AddParticipantsModal.scss";
import { UserList } from "../../interfaces/models/Users";
import { useCallback, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { addOutline, removeOutline } from "ionicons/icons";
import AvatarImg from "../avatar";
import lodash from "lodash";

interface AddParticipantsModalProps {
  users: UserList[];
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  completionCallback: (invitedUsers: UserList[]) => void;
}

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = (props) => {
  const { users, showModal, setShowModal, completionCallback } = props;
  const { user, searchUser } = useUser();
  const [searchText, setSearchText] = useState("");
  const [matchedUsers, setMatchedUsers] = useState<UserList[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<UserList[]>(users);

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
      setMatchedUsers(response);
    } catch (error) {}
  };

  const handleInvite = (user: UserList) => {
    console.log(user);
    const index = invitedUsers.indexOf(user);
    if (index !== -1) {
      var newInvitedUsers = invitedUsers.slice(0);
      newInvitedUsers = invitedUsers.filter((u) => u.userId !== user.userId);
      console.log(newInvitedUsers);
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
      <IonHeader translucent>
        <IonToolbar className='modal-search'>
          <IonSearchbar
            key='modal-search'
            value={searchText}
            onIonChange={(e) => {
              setSearchText(e.detail.value ?? "");
              debouncedSearch(e.detail.value ?? "");
            }}
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
                {u.userId === user?.userId ? (
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
                      disabled
                      fill='solid'
                      style={{ height: "2.5rem", width: "4.5rem" }}
                    >
                      You
                    </IonButton>
                  </IonCol>
                ) : (
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
                      color={
                        invitedUsers.indexOf(u) !== -1
                          ? "quinary"
                          : "quaternary"
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
                )}
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

export default AddParticipantsModal;
