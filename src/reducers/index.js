import { combineReducers } from "redux";

import * as restaurant from "./restaurant";
import * as dishes from "./dishes";

export default combineReducers({
  restaurant: restaurant.reducer,
  dishes: dishes.reducer
});
