import React from "react";

import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

// eslint-disable-next-line react/prop-types
const AppProviders: React.SFC = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
