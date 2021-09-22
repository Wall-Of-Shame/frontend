import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../interfaces/models/Challenges";
import APIService from "../services/APIService";

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

const uploadProof = async (
  challengeId: string,
  data: string
): Promise<string | null> => {
  try {
    const response = await APIService.post(`challenges/${challengeId}/proofs`, {
      data: data,
    });
    return response.data;
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
  uploadProof,
};
