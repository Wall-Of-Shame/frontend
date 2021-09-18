import React from "react";
import { IonAlert } from "@ionic/react";

interface AlertProps {
  showAlert: boolean;
  closeAlert: (event: CustomEvent) => void;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler?: () => void;
  okHandler?: () => void;
}

const Alert: React.FunctionComponent<AlertProps> = (props: AlertProps) => {
  const {
    showAlert,
    closeAlert,
    alertHeader,
    alertMessage,
    hasConfirm,
    confirmHandler,
    cancelHandler,
    okHandler,
  } = props;

  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={closeAlert}
      header={alertHeader}
      message={alertMessage}
      backdropDismiss={cancelHandler === undefined}
      buttons={
        hasConfirm
          ? cancelHandler !== undefined
            ? [
                {
                  text: "Cancel",
                  handler: cancelHandler,
                  cssClass: "danger",
                },
                {
                  text: "Proceed",
                  handler: confirmHandler,
                },
              ]
            : [
                {
                  text: "Cancel",
                  role: "cancel",
                },
                {
                  text: "Proceed",
                  handler: confirmHandler,
                },
              ]
          : okHandler !== undefined
          ? [{ text: "OK", handler: okHandler }]
          : ["OK"]
      }
    />
  );
};

export default Alert;
