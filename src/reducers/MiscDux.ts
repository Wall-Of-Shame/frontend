import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserData } from "../interfaces/models/Users";

export interface MiscDux {
  user?: UserData;
  lastRetrieved?: number;
}

const initialState: MiscDux = {};

// Contains user information, theme, view selected and fun fact of the day
const misc = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>): void => {
      state.user = { ...action.payload };
      state.lastRetrieved = Date.now();
    },
    clearUser: (state): void => {
      state.user = undefined;
      state.lastRetrieved = undefined;
    },
  },
});

export const { setUser, clearUser } = misc.actions;

export default misc.reducer;
