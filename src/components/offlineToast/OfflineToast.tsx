import {
  IonToast,
} from "@ionic/react";

interface OfflineToastProps {
  message: string;
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
}

const OfflineToast: React.FC<OfflineToastProps> = (props) => {
  const { message, showToast, setShowToast } = props;

  return (
    <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message={message}
      duration={2000}
      color="dark"
    />
  );
};

export default OfflineToast;
