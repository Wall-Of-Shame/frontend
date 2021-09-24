import {
  Avatar,
  Settings,
  UserData,
  UserList,
} from "../interfaces/models/Users";
import APIService from "../services/APIService";
import AuthService from "./AuthService";

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
    await APIService.patch("self", data);
    return await AuthService.getUser();
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchUser = async (searchText: string): Promise<UserList[]> => {
  try {
    const response = await APIService.get(
      `users/?operation=search&query=${searchText}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getFriendsRankings = async (): Promise<UserList[]> => {
  try {
    const response = await APIService.get(`users/?operation=wallRecents`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getGlobalRankings = async (): Promise<UserList[]> => {
  try {
    const response = await APIService.get(`users/?operation=wallGlobal`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateProfile,
  searchUser,
  getFriendsRankings,
  getGlobalRankings,
};
