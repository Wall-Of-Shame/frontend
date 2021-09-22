import React from "react";
import { useDispatch } from "react-redux";
import ChallengeContextInterface from "../interfaces/contexts/ChallengeContext";
import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../interfaces/models/Challenges";
import {
  setHistory,
  setOngoing,
  setPendingResponse,
  setPendingStart,
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
        setOngoing({
          challenges: response.ongoing,
          lastRetrieved: Date.now(),
        })
      );
      dispatch(
        setPendingResponse({
          challenges: response.pendingResponse,
          lastRetrieved: Date.now(),
        })
      );
      dispatch(
        setPendingStart({
          challenges: response.pendingStart,
          lastRetrieved: Date.now(),
        })
      );
      dispatch(
        setHistory({
          challenges: response.history,
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

  const updateChallenge = async (
    id: string,
    data: ChallengePost
  ): Promise<void> => {
    try {
      await ChallengeService.updateChallenge(id, data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const acceptChallenge = async (id: string): Promise<void> => {
    try {
      await ChallengeService.acceptChallenge(id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const rejectChallenge = async (id: string): Promise<void> => {
    try {
      await ChallengeService.rejectChallenge(id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const completeChallenge = async (id: string): Promise<void> => {
    try {
      await ChallengeService.completeChallenge(id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const uploadProof = async (id: string, data: any): Promise<string | null> => {
    try {
      const url = await ChallengeService.uploadProof(id, data);
      return url;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <ChallengeContext.Provider
      value={{
        getAllChallenges,
        getChallenge,
        createChallenge,
        updateChallenge,
        acceptChallenge,
        rejectChallenge,
        completeChallenge,
        uploadProof,
      }}
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
