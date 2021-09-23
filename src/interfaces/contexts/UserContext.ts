import { Avatar, Settings, UserData, UserList } from "../models/Users";

export default interface UserContextInterface {
  user: UserData | null;
  updateProfile(
    name: string,
    username: string,
    settings: Settings,
    avatar: Avatar
  ): Promise<UserData | null>;
  searchUser(searchText: string): Promise<UserList[]>;
  getFriendsRankings(): Promise<UserList[]>;
  getGlobalRankings(): Promise<UserList[]>;
}
