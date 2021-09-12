import { ACCESS_TOKEN_KEY } from "../../utils/TokenUtils";

export default interface LoginData {
  [ACCESS_TOKEN_KEY]: string;
}
