import { Avatar, Settings, UserData } from "../interfaces/models/Users";
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
    const response = await APIService.patch("self", data);
    console.log(response);
    return await AuthService.getUser();
  } catch (error) {
    return Promise.reject(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { updateProfile };
