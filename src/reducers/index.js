import { combineReducers } from "redux";

import * as counter from "./counter";
import * as restaurant from "./restaurant";
import * as dishes from "./dishes";

export default combineReducers({
  counter: counter.reducer,
  restaurant: restaurant.reducer,
  dishes: dishes.reducer
});
