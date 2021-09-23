import React from "react";

import { AuthProvider } from "./AuthContext";
import { CacheProvider } from "./CacheContext";
import { ChallengeProvider } from "./ChallengeContext";
import { UserProvider } from "./UserContext";

// eslint-disable-next-line react/prop-types
const AppProviders: React.FC = ({ children }) => {
  return (
    <CacheProvider>
      <AuthProvider>
        <UserProvider>
          <ChallengeProvider>{children}</ChallengeProvider>
        </UserProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default AppProviders;
