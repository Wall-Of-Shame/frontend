import { DiscardableData } from "./Base";

export interface UserPostData {
  username: string;
  name?: string;
  password: string | null;
}

export interface UserPatchData {
  username: string;
  name: string;
}

export interface UserListData extends DiscardableData {
  username: string;
  name: string;
}

export type UserData = UserListData;
