import React from "react";
import { useDispatch } from "react-redux";
import ChallengeContextInterface from "../interfaces/contexts/ChallengeContext";
import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../interfaces/models/Challenges";
import {
  setOngoingChallenges,
  setPendingChallenges,
} from "../reducers/ChallengeDux";
import ChallengeService from "../services/ChallengeService";

const ChallengeContext = React.createContext<
  ChallengeContextInterface | undefined
>(undefined);

const ChallengeProvider: React.FC = (props) => {
  const dispatch = useDispatch();

  const getAllChallenges = async (): Promise<ChallengeList> => {
    try {
      const response = await ChallengeService.getChallenges();
      dispatch(
        setOngoingChallenges({
          challenges: response.ongoing,
          lastRetrieved: Date.now(),
        })
      );
      dispatch(
        setPendingChallenges({
          challenges: response.pending,
          lastRetrieved: Date.now(),
        })
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getChallenge = async (id: string): Promise<ChallengeData | null> => {
    try {
      const response = await ChallengeService.getChallenge(id);
      console.log(response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createChallenge = async (data: ChallengePost): Promise<void> => {
    try {
      await ChallengeService.createChallenge(data);
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
