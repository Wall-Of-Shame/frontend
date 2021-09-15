import { UserData, UserPostData } from "../models/Users";

export default interface AuthContextInterface {
  data: UserData | null;
  signup(data: UserPostData): Promise<void>;
  login(data: UserPostData): Promise<void>;
  logout(): Promise<void>;
}
