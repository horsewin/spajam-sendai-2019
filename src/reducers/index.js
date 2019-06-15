import { combineReducers } from "redux";

import * as counter from "./counter";

export default combineReducers({
    counter: counter.reducer
});
