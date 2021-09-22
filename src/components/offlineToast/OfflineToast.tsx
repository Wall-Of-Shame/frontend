import {
  IonToast,
} from "@ionic/react";

interface OfflineToastProps {
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
}

const OfflineToast: React.FC<OfflineToastProps> = (props) => {
  const { showToast, setShowToast } = props;

  return (
    <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message="Sorry, we need the internets to do that :("
      duration={2000}
      color="dark"
    />
  );
};

export default OfflineToast;
