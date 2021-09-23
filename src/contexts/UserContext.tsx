import React from "react";

import UserContextInterface from "../interfaces/contexts/UserContext";
import {
  Avatar,
  Settings,
  UserData,
  UserList,
} from "../interfaces/models/Users";
import UserService from "../services/UserService";

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
    return await UserService.updateProfile(name, username, settings, avatar);
  };

  const searchUser = async (searchText: string): Promise<UserList[]> => {
    try {
      const response = await UserService.searchUser(searchText);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getFriendsRankings = async (): Promise<UserList[]> => {
    try {
      const data = await UserService.getFriendsRankings();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getGlobalRankings = async (): Promise<UserList[]> => {
    try {
      const data = await UserService.getGlobalRankings();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: data,
        updateProfile,
        searchUser,
        getFriendsRankings,
        getGlobalRankings,
      }}
      {...props}
    />
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
