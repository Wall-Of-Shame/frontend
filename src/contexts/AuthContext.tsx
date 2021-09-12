/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useAsync } from "react-async";

import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import AuthContextInterface from "../interfaces/contexts/AuthContext";
import { UserPostData } from "../interfaces/models/Users";
import AuthService from "../services/AuthService";

const AuthContext = React.createContext<AuthContextInterface | undefined>(
  undefined
);

const AuthProvider: React.FunctionComponent = (props) => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = null,
    error,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({
    promiseFn: AuthService.getUser,
  });

  // Uses useLayoutEffect as auth status directly affects the view
  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return (
        <LoadingSpinner
          loading={true}
          closeLoading={(): void => {}}
          message='Loading'
        />
      );
    }
    if (isRejected && error) {
      return (
        <div>
          <p>There&apos;s a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }

  const signup = (signupData: UserPostData): Promise<void> =>
    AuthService.signup(signupData)
      .then(reload)
      .catch((e: Error) => {
        return Promise.reject(new Error(e.message));
      });

  const login = (loginData: UserPostData): Promise<void> =>
    AuthService.login(loginData)
      .then(reload)
      .catch((e: Error) => {
        return Promise.reject(new Error(e.message));
      });

  const logout = (): Promise<void> =>
    AuthService.logout()
      .then(reload)
      .then(() => window.location.replace(window.location.href));

  return (
    <AuthContext.Provider value={{ data, signup, login, logout }} {...props} />
  );
};

const useAuth = (): AuthContextInterface => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
