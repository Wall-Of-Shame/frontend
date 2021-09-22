import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChallengeData } from "../interfaces/models/Challenges";
import { VoteList } from "../interfaces/models/Votes";

export interface ChallengeDux {
  ongoing: ChallengeData[];
  pendingResponse: ChallengeData[];
  pendingStart: ChallengeData[];
  history: ChallengeData[];
  votes: VoteList;
  lastRetrieved: Date | number | null;
}

const initialState: ChallengeDux = {
  ongoing: [],
  pendingResponse: [],
  pendingStart: [],
  history: [],
  votes: [],
  lastRetrieved: null,
};

const challenges = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    setOngoing: (
      state,
      action: PayloadAction<{
        challenges: ChallengeData[];
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.ongoing = action.payload.challenges;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    setPendingResponse: (
      state,
      action: PayloadAction<{
        challenges: ChallengeData[];
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.pendingResponse = action.payload.challenges;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    setPendingStart: (
      state,
      action: PayloadAction<{
        challenges: ChallengeData[];
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.pendingStart = action.payload.challenges;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    setHistory: (
      state,
      action: PayloadAction<{
        challenges: ChallengeData[];
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.history = action.payload.challenges;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    setVotes: (
      state,
      action: PayloadAction<{
        votes: VoteList;
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.votes = action.payload.votes;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    clearChallenges: (state): void => {
      state.ongoing = [];
      state.pendingResponse = [];
      state.pendingStart = [];
      state.history = [];
      state.lastRetrieved = null;
    },
  },
});

export const {
  setOngoing,
  setPendingResponse,
  setPendingStart,
  setHistory,
  setVotes,
  clearChallenges,
} = challenges.actions;

export default challenges.reducer;
