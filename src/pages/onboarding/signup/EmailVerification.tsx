import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonIcon,
  IonInput,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import Container from "../../../components/container";

interface EmailVerificationProps {
  nextPage: () => void;
  prevPage: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = (
  props: EmailVerificationProps
) => {
  const { nextPage, prevPage } = props;

  const verifyCode = () => {
    let code = "";
    code = code
      .concat(firstCode)
      .concat(secondCode)
      .concat(thirdCode)
      .concat(fourthCode)
      .concat(fifthCode)
      .concat(sixthCode);
    console.log(code);
    nextPage();
  };

  const checkIncompleteCode = (): boolean => {
    return !(
      firstCode &&
      secondCode &&
      thirdCode &&
      fourthCode &&
      fifthCode &&
      sixthCode
    );
  };

  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null);
  const thirdRef = useRef<any>(null);
  const fourthRef = useRef<any>(null);
  const fifthRef = useRef<any>(null);
  const sixthRef = useRef<any>(null);

  const [firstCode, setFirstCode] = useState("");
  const [secondCode, setSecondCode] = useState("");
  const [thirdCode, setThirdCode] = useState("");
  const [fourthCode, setFourthCode] = useState("");
  const [fifthCode, setFifthCode] = useState("");
  const [sixthCode, setSixthCode] = useState("");
  return (
    <IonContent fullscreen>
      <IonFab horizontal='start' vertical='top' style={{ marginTop: "1rem" }}>
        <IonIcon icon={arrowBackOutline} size='large' onClick={prevPage} />
      </IonFab>
      <Container>
        <IonRow slot='start' style={{ marginBottom: "2rem" }}>
          <IonText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
          >
            Verify your email
          </IonText>
        </IonRow>
        <IonRow slot='start' style={{ textAlign: "left" }}>
          <IonText
            style={{
              fontSize: "18px",
              marginLeft: "1rem",
            }}
          >
            Enter the verification code sent to your email
          </IonText>
        </IonRow>
        <IonList className='ion-padding-vertical'>
          <IonRow>
            <IonCol>
              <IonInput
                ref={firstRef}
                name='first'
                type='tel'
                maxlength={1}
                value={firstCode}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setFirstCode(event.detail.value);
                  if (event.detail.value.length > 0) {
                    secondRef.current.setFocus();
                  }
                }}
                style={{
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  textIndent: "0.5rem",
                }}
              />
            </IonCol>
            <IonCol>
              <IonInput
                ref={secondRef}
                name='second'
                type='tel'
                maxlength={1}
                value={secondCode}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setSecondCode(event.detail.value);
                  if (event.detail.value.length > 0) {
                    thirdRef.current.setFocus();
                  }
                }}
                style={{
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  textIndent: "0.5rem",
                }}
              />
            </IonCol>
            <IonCol>
              <IonInput
                ref={thirdRef}
                name='third'
                type='tel'
                maxlength={1}
                value={thirdCode}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setThirdCode(event.detail.value);
                  if (event.detail.value.length > 0) {
                    fourthRef.current.setFocus();
                  }
                }}
                style={{
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  textIndent: "0.5rem",
                }}
              />
            </IonCol>
            <IonCol>
              <IonInput
                ref={fourthRef}
                name='fourth'
                type='tel'
                maxlength={1}
                value={fourthCode}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setFourthCode(event.detail.value);
                  if (event.detail.value.length > 0) {
                    fifthRef.current.setFocus();
                  }
                }}
                style={{
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  textIndent: "0.5rem",
                }}
              />
            </IonCol>
            <IonCol>
              <IonInput
                ref={fifthRef}
                name='fifth'
                type='tel'
                maxlength={1}
                value={fifthCode}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setFifthCode(event.detail.value);
                  if (event.detail.value.length > 0) {
                    sixthRef.current.setFocus();
                  }
                }}
                style={{
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  textIndent: "0.5rem",
                }}
              />
            </IonCol>
            <IonCol>
              <IonInput
                ref={sixthRef}
                name='sixth'
                type='tel'
                maxlength={1}
                value={sixthCode}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setSixthCode(event.detail.value);
                }}
                style={{
                  borderBottom: "solid 1px",
                  textAlign: "center",
                  textIndent: "0.5rem",
                }}
              />
            </IonCol>
          </IonRow>
        </IonList>
        <IonButton
          expand='block'
          fill='solid'
          className='ion-padding-horizontal'
          style={{ marginTop: "2rem" }}
          onClick={verifyCode}
          disabled={false && checkIncompleteCode()}
        >
          Next
        </IonButton>
      </Container>
    </IonContent>
  );
};

export default EmailVerification;
