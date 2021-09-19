import store from "../app/store";
import { UserData } from "../interfaces/models/Users";
import { clearUser, setUser } from "../reducers/MiscDux";
import APIService from "../services/APIService";
import TokenUtils from "../utils/TokenUtils";

const logout = (): Promise<void> => {
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  return Promise.resolve();
};

const login = async (token: string): Promise<void> => {
  const data = {
    token: token,
  };
  try {
    const response = await APIService.post("auth", data);
    console.log(response);
    console.log("WTF");
    await TokenUtils.storeToken(response);
    store.dispatch(setUser(response.data.user));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

const getUser = async (): Promise<UserData | null> => {
  const token = TokenUtils.getToken();
  if (!token) {
    return Promise.resolve(null);
  }

  try {
    const response = await APIService.get("self");
    if (response.status === 200) {
      console.log("Damn");
      console.log(response);
      const user = response.data;
      console.log(user);
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
  login,
  logout,
  getUser,
};
