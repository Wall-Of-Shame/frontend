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
import { useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../../../components/container";
import { SignUpModalState } from "./SignUpModal";

interface EmailVerificationProps {
  state: SignUpModalState;
  setState: React.Dispatch<Partial<SignUpModalState>>;
  nextPage: () => void;
  prevPage: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = (
  props: EmailVerificationProps
) => {
  const { state, setState, nextPage, prevPage } = props;

  const verifyCode = () => {
    let code = "";
    code = state.verificationCode.reduce((prev, curr) => prev.concat(curr));
    console.log(code);
    nextPage();
  };

  const checkIncompleteCode = (): boolean => {
    return state.verificationCode.every((code) => code.length > 0);
  };

  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null);
  const thirdRef = useRef<any>(null);
  const fourthRef = useRef<any>(null);
  const fifthRef = useRef<any>(null);
  const sixthRef = useRef<any>(null);

  return (
    <IonContent fullscreen>
      <IonFab
        horizontal='start'
        vertical='top'
        style={{ marginTop: "1rem", marginLeft: "1rem" }}
      >
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
                value={state.verificationCode[0]}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setState({
                    verificationCode: [
                      ...state.verificationCode.slice(0, 0),
                      event.detail.value,
                      ...state.verificationCode.slice(1),
                    ],
                  });
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
                value={state.verificationCode[1]}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setState({
                    verificationCode: [
                      ...state.verificationCode.slice(0, 1),
                      event.detail.value,
                      ...state.verificationCode.slice(2),
                    ],
                  });
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
                value={state.verificationCode[2]}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setState({
                    verificationCode: [
                      ...state.verificationCode.slice(0, 2),
                      event.detail.value,
                      ...state.verificationCode.slice(3),
                    ],
                  });
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
                value={state.verificationCode[3]}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setState({
                    verificationCode: [
                      ...state.verificationCode.slice(0, 3),
                      event.detail.value,
                      ...state.verificationCode.slice(4),
                    ],
                  });
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
                value={state.verificationCode[4]}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setState({
                    verificationCode: [
                      ...state.verificationCode.slice(0, 4),
                      event.detail.value,
                      ...state.verificationCode.slice(5),
                    ],
                  });
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
                value={state.verificationCode[5]}
                required
                autocomplete='off'
                onIonChange={(event: CustomEvent) => {
                  setState({
                    verificationCode: [
                      ...state.verificationCode.slice(0, 5),
                      event.detail.value,
                      ...state.verificationCode.slice(6),
                    ],
                  });
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
          Verify
        </IonButton>
        <IonRow
          class='ion-justify-content-center'
          style={{ marginTop: "1rem" }}
        >
          <IonText class='ion-text-center' color='medium'>
            Did not receive the email?&nbsp;
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <IonText style={{ fontWeight: "bold" }}>Resend</IonText>
            </Link>
          </IonText>
        </IonRow>
      </Container>
    </IonContent>
  );
};

export default EmailVerification;
