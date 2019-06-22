import * as types from "../actions/actionsTypes";

const initialState = [];
export function reducer(state = initialState, action) {
  if (action.type === types.dishes.UPDATE) {
    return [...action.value];
  }
  return state;
}
