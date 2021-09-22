import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChallengeData } from "../interfaces/models/Challenges";

export interface ChallengeDux {
  ongoing: ChallengeData[];
  pendingResponse: ChallengeData[];
  pendingStart: ChallengeData[];
  history: ChallengeData[];
  lastRetrieved: Date | number | null;
}

const initialState: ChallengeDux = {
  ongoing: [],
  pendingResponse: [],
  pendingStart: [],
  history: [],
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
  clearChallenges,
} = challenges.actions;

export default challenges.reducer;
