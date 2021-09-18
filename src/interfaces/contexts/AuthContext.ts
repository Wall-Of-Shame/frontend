import { User } from "@firebase/auth";
import { UserData } from "../models/Users";

export default interface AuthContextInterface {
  data: UserData | null;
  signup(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  refreshFirebaseUser(): Promise<void>;
  getFirebaseUser(): User | null;
  resendVerificationEmail(email: string): Promise<void>;
  logout(): Promise<void>;
}
