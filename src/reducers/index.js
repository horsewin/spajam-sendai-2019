import { combineReducers } from "redux";

import * as restaurant from "./restaurant";
import * as dishes from "./dishes";
import * as myDishes from "./myDishes";

export default combineReducers({
  restaurant: restaurant.reducer,
  dishes: dishes.reducer,
  myDishes: myDishes.reducer
});
