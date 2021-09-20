import { ChallengeData } from "../interfaces/models/Challenges";
import { Avatar, Settings, UserData } from "../interfaces/models/Users";
import APIService from "../services/APIService";
import AuthService from "./AuthService";

const getChallenges = async (): Promise<ChallengeData[]> => {
  try {
    const response = await APIService.get("challenges");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getChallenges };
