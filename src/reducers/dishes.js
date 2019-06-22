import * as types from "../actions/actionsTypes";

//[{
// "picutre": string
// "scoville": number
// "name": string
// }]
const initialState = [];

export function reducer(state = initialState, action) {
  if (action.type === types.dishes.UPDATE) {
    return [...action.value];
  }
  return state;
}
