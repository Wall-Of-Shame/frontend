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
  okText?: string;
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
    okText,
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
          ? [{ text: okText ?? "OK", handler: okHandler }]
          : [okText ?? "OK"]
      }
    />
  );
};

export default Alert;
