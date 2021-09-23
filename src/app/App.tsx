/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { useUser } from "../contexts/UserContext";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import "./App.scss";
import { useCache } from "../contexts/CacheContext";
import Alert from "../components/alert";

const UnauthenticatedAppPage = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(
    () => import("./UnauthenticatedApp")
  );
});

const App: React.FC = () => {
  const user = useUser();
  const { isLatestVersion, refreshCacheAndReload } = useCache();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <React.Suspense
      fallback={
        <LoadingSpinner
          loading={true}
          closeLoading={(): void => {}}
          message='Loading'
        />
      }
    >
      {user.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {!isLatestVersion && (
        <Alert
          showAlert={showAlert}
          closeAlert={() => {
            setShowAlert(false);
            refreshCacheAndReload();
          }}
          alertHeader={"App Update"}
          alertMessage={
            "A new version of the app is now available! This update will only take a few seconds."
          }
          hasConfirm={false}
          confirmHandler={() => {}}
          okHandler={refreshCacheAndReload}
        />
      )}
    </React.Suspense>
  );
};

export default App;
