import React from "react";

import UserContextInterface from "../interfaces/contexts/UserContext";
import { Avatar, Settings, UserData } from "../interfaces/models/Users";
import APIService from "../services/APIService";
import AuthService from "../services/AuthService";

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
  ): Promise<UserData | null> => {
    const data = {
      name,
      username,
      settings,
      avatar,
    };
    try {
      const response = await APIService.patch("self", data);
      console.log(response);
      return await AuthService.getUser();
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
