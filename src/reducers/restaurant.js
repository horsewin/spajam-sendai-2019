import * as types from "../actions/actionsTypes";

const initialState = {
  name: "",
  scoville: 0,
  img: null
};

export function reducer(state = initialState, action) {
  if (action.type === types.restaurant.UPDATE) {
    return { ...state, ...action.value };
  }
  return state;
}
