/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { useUser } from "../contexts/UserContext";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import "./App.scss";

const UnauthenticatedAppPage = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(
    () => import("./UnauthenticatedApp")
  );
});

const App: React.FC = () => {
  const user = useUser();

  console.log("In App");
  console.log(user.user);
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
    </React.Suspense>
  );
};

export default App;
