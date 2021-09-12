import React from "react";
import { IonLoading } from "@ionic/react";

interface LoadingProps {
  loading: boolean;
  closeLoading: (event: CustomEvent) => void;
  message: string;
}

const LoadingSpinner: React.FunctionComponent<LoadingProps> = (
  props: LoadingProps
) => {
  const { loading, closeLoading, message } = props;
  return (
    <IonLoading
      isOpen={loading}
      onDidDismiss={closeLoading}
      message={message}
      duration={10000}
      spinner='crescent'
    />
  );
};

export default LoadingSpinner;
