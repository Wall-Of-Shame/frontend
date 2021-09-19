import store from "../app/store";
import { GENERAL_ERROR } from "../constants/Messages";
import { UserData } from "../interfaces/models/Users";
import { clearUser, setUser } from "../reducers/MiscDux";
import ApiService from "../services/APIService";
import TokenUtils from "../utils/TokenUtils";

const logout = (): Promise<void> => {
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  return Promise.resolve();
};

const signup = async (token: string): Promise<null> => {
  const data = {
    token: token,
  };
  const response = await ApiService.post("users/create", data).catch(
    (error: any) => {
      return Promise.reject(
        new Error(error.response?.data?.error ?? GENERAL_ERROR)
      );
    }
  );
  return TokenUtils.storeToken(response);
};

const login = async (token: string): Promise<null> => {
  const data = {
    token: token,
  };
  const response = await ApiService.post("auth", data).catch((error: any) => {
    return Promise.reject(
      new Error(error.response?.data?.error ?? GENERAL_ERROR)
    );
  });
  return TokenUtils.storeToken(response);
};

const getUser = async (): Promise<UserData | null> => {
  const token = TokenUtils.getToken();
  if (!token) {
    return Promise.resolve(null);
  }

  try {
    const response = await ApiService.get("users/self");
    if (response.status === 200) {
      const { user } = response.data;
      store.dispatch(setUser(user));
      return user;
    }
    throw new Error(response.statusText);
  } catch (error) {
    logout();
    return Promise.reject(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signup,
  login,
  logout,
  getUser,
};
