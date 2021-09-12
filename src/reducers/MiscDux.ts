/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../interfaces/User";

export interface MiscDux {
  user: User;
}

const initialState: MiscDux = {
  user: {
    id: null,
    name: null,
    isEmailVerified: false,
  },
};

// Contains user information
const misc = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>): void => {
      state.user = { ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<User>>): void => {
      state.user = { ...state.user, ...action.payload };
    },
    clearUser: (state): void => {
      state.user = {
        id: null,
        name: null,
        isEmailVerified: false,
      };
    },
  },
});

export const { setUser, updateUser, clearUser } = misc.actions;

export default misc.reducer;
