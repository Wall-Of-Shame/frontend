import React from "react";
import { useDispatch } from "react-redux";
import ChallengeContextInterface from "../interfaces/contexts/ChallengeContext";
import { ChallengeData, ChallengePost } from "../interfaces/models/Challenges";

const ChallengeContext = React.createContext<
  ChallengeContextInterface | undefined
>(undefined);

const ChallengeProvider: React.FC = (props) => {
  const dispatch = useDispatch();

  const getAllChallenges = async (): Promise<ChallengeData[]> => {
    try {
      return [];
      // eslint-disable-next-line no-unreachable
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
