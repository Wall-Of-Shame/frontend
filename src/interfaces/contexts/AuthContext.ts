import { User } from "@firebase/auth";
import { UserData } from "../models/Users";

export default interface AuthContextInterface {
  data: UserData | null;
  signup(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  continueWithGoogle(): Promise<void>;
  continueWithFacebook(): Promise<void>;
  refreshFirebaseUser(): Promise<void>;
  getFirebaseUser(): User | null;
  resendVerificationEmail(): Promise<void>;
  logout(): Promise<void>;
}
