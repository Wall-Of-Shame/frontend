import React from "react";
import ChallengeContextInterface from "../interfaces/contexts/ChallengeContext";
import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../interfaces/models/Challenges";
import ChallengeService from "../services/ChallengeService";

const ChallengeContext = React.createContext<
  ChallengeContextInterface | undefined
>(undefined);

const ChallengeProvider: React.FC = (props) => {
  const getAllChallenges = async (): Promise<ChallengeList> => {
    try {
      const response = await ChallengeService.getChallenges();
      console.log(response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getChallenge = async (id: string): Promise<ChallengeData | null> => {
    try {
      return null;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const createChallenge = async (data: ChallengePost): Promise<void> => {
    try {
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <ChallengeContext.Provider
      value={{ getAllChallenges, getChallenge, createChallenge }}
      {...props}
    />
  );
};

const useChallenge = (): ChallengeContextInterface => {
  const context = React.useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error(`useChallenge must be used within a ChallengeProvider`);
  }
  return context;
};

export { ChallengeProvider, useChallenge };
