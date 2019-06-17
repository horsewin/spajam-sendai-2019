import * as types from "../actions/actionsTypes";

const initialState = {
  counter: 0
};

export function reducer(state = initialState, action) {
  if (action.type === types.counter.UPDATE) {
    return { ...state, ...action.value };
  }
  return state;
}
