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
import { arrowBackOutline, cloudUploadOutline } from "ionicons/icons";
import Container from "../../../../components/container";
import { useReducer, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import LoadingSpinner from "../../../../components/loadingSpinner";
import Alert from "../../../../components/alert";
import ImageUploader from "react-images-upload";
import "./UploadProofModal.scss";
import { useChallenge } from "../../../../contexts/ChallengeContext";
import {
  ChallengeData,
  UserMini,
} from "../../../../interfaces/models/Challenges";
import imageCompression from "browser-image-compression";

interface UploadProofModalProps {
  challenge: ChallengeData;
  userData: UserMini | undefined;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export interface UploadProofModalState {
  challenge?: ChallengeData;
  uploadMode: boolean;
  evidenceLink?: string;
  isLoading: boolean;
  showAlert: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  okHandler?: () => void;
}

const UploadProofModal: React.FC<UploadProofModalProps> = (
  props: UploadProofModalProps
) => {
  const { challenge, userData, showModal, setShowModal } = props;
  const { getChallenge, uploadProof } = useChallenge();

  const [state, setState] = useReducer(
    (s: UploadProofModalState, a: Partial<UploadProofModalState>) => ({
      ...s,
      ...a,
    }),
    {
      challenge: challenge,
      uploadMode:
        userData?.evidenceLink === undefined || userData?.evidenceLink === "",
      evidenceLink: userData?.evidenceLink,
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

  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };

  const onDrop = async (files: File[], pictures: string[]) => {
    if (pictures && pictures.length > 0 && files && files.length > 0) {
      const splitted = pictures[0].split(";");
      setImage(splitted[1].slice(5));
      setFile(files[0]);
    } else {
      setImage("");
    }
  };

  const handleReUpload = () => {
    setState({
      showAlert: true,
      hasConfirm: true,
      alertHeader: "Are you sure?",
      alertMessage:
        "Your original proof will be replaced with your new proof :)",
      confirmHandler: () => {
        setState({ uploadMode: true });
      },
      cancelHandler: () => {},
    });
  };

  const handleSubmit = async () => {
    setState({ isLoading: true });
    try {
      const compressedFile = await imageCompression(file!, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        if (reader.result && typeof reader.result === "string") {
          await uploadProof(challenge.challengeId, reader.result);
          await fetchData();
          setState({
            isLoading: false,
            showAlert: true,
            alertHeader: "Success",
            alertMessage: "Your proof has been uploaded successfully",
            hasConfirm: false,
            uploadMode: false,
          });
        } else {
          throw new Error("Please re-upload your image file!");
        }
      };
    } catch {
      setState({
        isLoading: false,
        showAlert: true,
        alertHeader: "Error processing the image you uploaded",
        alertMessage: "Please refresh and try again later",
      });
    }
  };

  const fetchData = async () => {
    try {
      const updatedChallenge = await getChallenge(challenge.challengeId);
      if (updatedChallenge) {
        const evidenceLink =
          updatedChallenge.participants.accepted.completed.find(
            (p) => p.userId === userData?.userId
          )?.evidenceLink ?? "";
        setState({ challenge: updatedChallenge, evidenceLink });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              setState({
                uploadMode:
                  userData?.evidenceLink === undefined ||
                  userData?.evidenceLink === "",
              });
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
              My proof
            </IonText>
          </IonRow>
          {state.uploadMode ? (
            <>
              <ImageUploader
                withIcon={false}
                buttonText='&nbsp;&nbsp;&nbsp;Select Image&nbsp;&nbsp;&nbsp;'
                buttonStyles={image ? { display: "none" } : undefined}
                onChange={onDrop}
                withPreview={true}
                singleImage={true}
                label={"Selected: " + image ?? "None"}
                labelStyles={{
                  textAlign: "center",
                  paddingBottom: "16px",
                  fontSize: "16px",
                }}
                imgExtension={[".jpg", ".png", ".gif", "jpeg"]}
                maxFileSize={Infinity}
              />
              <IonButton
                fill='solid'
                shape='round'
                color='secondary'
                className='ion-padding-horizontal'
                style={{ marginTop: "2rem" }}
                disabled={file === null}
                onClick={handleSubmit}
              >
                <IonText
                  style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                >
                  Confirm
                </IonText>
              </IonButton>
            </>
          ) : (
            <>
              <IonRow className='ion-justify-content-center ion-margin-top'>
                <img src={state.evidenceLink} alt='Proof' />
              </IonRow>
              <IonButton
                fill='solid'
                shape='round'
                color='secondary'
                className='ion-padding-horizontal'
                style={{ marginTop: "2rem" }}
                onClick={handleReUpload}
              >
                <IonText
                  style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                >
                  Re-upload
                </IonText>
              </IonButton>
            </>
          )}
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

export default UploadProofModal;
