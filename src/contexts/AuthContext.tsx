/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useAsync } from "react-async";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import AuthContextInterface from "../interfaces/contexts/AuthContext";
import AuthService from "../services/AuthService";
import { FirebaseError } from "@firebase/util";
import TokenUtils from "../utils/TokenUtils";
import { UserData } from "../interfaces/models/Users";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      const token = await user.getIdToken();
      AuthService.login(token);
      await AuthService.getUser();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const continueWithGoogle = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result)!;
      const token = await result.user.getIdToken();
      console.log("WTF");
      console.log(token);
      await AuthService.login(token);
      await AuthService.getUser();
    } catch (error: any) {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return Promise.reject(error);
    }
  };

  const continueWithFacebook = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = FacebookAuthProvider.credentialFromResult(result)!;
      const token = await result.user.getIdToken();
      await AuthService.login(token);
      await AuthService.getUser();
    } catch (error: any) {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return Promise.reject(error);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log("Token");
      console.log(token);
      await AuthService.login(token);
      await AuthService.getUser().then(() => {
        reload();
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const refreshFirebaseUser = async (): Promise<void> => {
    try {
      const user = auth.currentUser;
      return user?.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getFirebaseUser = (): User | null => {
    return auth.currentUser;
  };

  const resendVerificationEmail = async (): Promise<void> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Promise.reject(new Error("User does not exist"));
      }
      sendEmailVerification(user!);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (): Promise<void> =>
    AuthService.logout()
      .then(reload)
      .then(() => {
        window.location.href = "onboarding";
      });

  return (
    <AuthContext.Provider
      value={{
        data,
        signup,
        login,
        continueWithGoogle,
        continueWithFacebook,
        refreshFirebaseUser,
        getFirebaseUser,
        resendVerificationEmail,
        logout,
      }}
      {...props}
    />
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
