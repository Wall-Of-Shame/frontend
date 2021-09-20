import { Avatar, Settings, UserData } from "../models/Users";

export default interface UserContextInterface {
  user: UserData | null;
  updateProfile(
    name?: string,
    username?: string,
    settings?: Settings,
    avatar?: Avatar
  ): Promise<void>;
}
