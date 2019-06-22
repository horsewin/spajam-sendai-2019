import { combineReducers } from "redux";

import * as counter from "./counter";
import * as restaurant from "./restaurant";

export default combineReducers({
  counter: counter.reducer,
  restaurant: restaurant.reducer
});
