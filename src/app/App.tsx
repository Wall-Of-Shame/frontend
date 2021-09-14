/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { useUser } from "../contexts/UserContext";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

const UnauthenticatedAppPage = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(
    () => import("./UnauthenticatedApp")
  );
});

const App: React.FC = () => {
  const user = useUser();

  console.log(user);
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
      {/* Renders the appropriate app
      {!!user ? <UnauthenticatedAppPage /> : <AuthenticatedApp />}
       */}
      <AuthenticatedApp />
    </React.Suspense>
  );
};

export default App;
