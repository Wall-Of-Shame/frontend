import { combineReducers } from "redux";
import challenges, { ChallengeDux } from "./ChallengeDux";

import misc, { MiscDux } from "./MiscDux";

export interface RootState {
  misc: MiscDux;
  challenges: ChallengeDux;
}

const RootReducer = combineReducers({
  misc,
  challenges,
});

export default RootReducer;
