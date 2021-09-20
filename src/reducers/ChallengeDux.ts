import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChallengeData } from "../interfaces/models/Challenges";

export interface ChallengeDux {
  ongoingChallenges: ChallengeData[];
  pendingChallenges: ChallengeData[];
  lastRetrieved: Date | number | null;
}

const initialState: ChallengeDux = {
  ongoingChallenges: [],
  pendingChallenges: [],
  lastRetrieved: null,
};

const challenges = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    setOngoingChallenges: (
      state,
      action: PayloadAction<{
        courses: ChallengeData[];
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.ongoingChallenges = action.payload.courses;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    setPendingChallenges: (
      state,
      action: PayloadAction<{
        courses: ChallengeData[];
        lastRetrieved: Date | number;
      }>
    ): void => {
      state.pendingChallenges = action.payload.courses;
      state.lastRetrieved = action.payload.lastRetrieved;
    },
    clearChallenges: (state): void => {
      state.ongoingChallenges = [];
      state.pendingChallenges = [];
      state.lastRetrieved = null;
    },
  },
});

export const { setOngoingChallenges, setPendingChallenges, clearChallenges } =
  challenges.actions;
