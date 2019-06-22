import * as types from "../actions/actionsTypes";

const initialState = {
  key: "",
  name: "",
  picture: null,
  averageScoville: 0
};

export function reducer(state = initialState, action) {
  if (action.type === types.restaurant.UPDATE) {
    return { ...state, ...action.value };
  }
  return state;
}
