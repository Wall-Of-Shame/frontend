import { UserPostData } from "../models/Users";
import { PersonData } from "../models/Persons";

export default interface AuthContextInterface {
  data: PersonData | null;
  signup(data: UserPostData): Promise<void>;
  login(data: UserPostData): Promise<void>;
  logout(): Promise<void>;
}
