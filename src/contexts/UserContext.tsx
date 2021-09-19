import React from "react";

import UserContextInterface from "../interfaces/contexts/UserContext";
import { Avatar, Settings } from "../interfaces/models/Users";
import APIService from "../services/APIService";

import { useAuth } from "./AuthContext";

const UserContext = React.createContext<UserContextInterface | undefined>(
  undefined
);

// Allows user data to be accessible from everywhere
const UserProvider: React.FunctionComponent = (props) => {
  const { data } = useAuth();

  const updateProfile = async (
    name: string,
    username: string,
    settings: Settings,
    avatar: Avatar
  ): Promise<void> => {
    const data = {
      name,
      username,
      settings,
      avatar,
    };
    try {
      await APIService.patch("self", data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <UserContext.Provider value={{ user: data, updateProfile }} {...props} />
  );
};

const useUser = (): UserContextInterface => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
