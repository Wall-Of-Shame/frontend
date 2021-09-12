import { combineReducers } from "redux";

import misc, { MiscDux } from "./MiscDux";

export interface RootState {
  misc: MiscDux;
}

const RootReducer = combineReducers({
  misc,
});

export default RootReducer;
