import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../interfaces/models/Challenges";
import { Avatar, Settings, UserData } from "../interfaces/models/Users";
import APIService from "../services/APIService";
import AuthService from "./AuthService";

const getChallenges = async (): Promise<ChallengeList> => {
  try {
    const response = await APIService.get("challenges");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getChallenge = async (id: string): Promise<ChallengeData | null> => {
  try {
    const response = await APIService.get(`challenges/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const createChallenge = async (data: ChallengePost): Promise<void> => {
  try {
    await APIService.post("challenges", data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateChallenge = async (
  challengeId: string,
  data: ChallengePost
): Promise<void> => {
  try {
    await APIService.patch(`challenges/${challengeId}`, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const acceptChallenge = async (challengeId: string): Promise<void> => {
  try {
    await APIService.post(`challenges/${challengeId}/accept`);
  } catch (error) {
    return Promise.reject(error);
  }
};

const rejectChallenge = async (challengeId: string): Promise<void> => {
  try {
    await APIService.post(`challenges/${challengeId}/reject`);
  } catch (error) {
    return Promise.reject(error);
  }
};

const completeChallenge = async (challengeId: string): Promise<void> => {
  try {
    await APIService.post(`challenges/${challengeId}/complete`);
  } catch (error) {
    return Promise.reject(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  acceptChallenge,
  rejectChallenge,
  completeChallenge,
};
