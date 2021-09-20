import React from "react";

import { AuthProvider } from "./AuthContext";
import { ChallengeProvider } from "./ChallengeContext";
import { UserProvider } from "./UserContext";

// eslint-disable-next-line react/prop-types
const AppProviders: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ChallengeProvider>{children}</ChallengeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
