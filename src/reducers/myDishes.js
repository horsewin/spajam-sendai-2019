import * as types from "../actions/actionsTypes";

//[{
// "dish": string
// "scoville": number
// "restrauntName": string
// }]
const initialState = [];

export function reducer(state = initialState, action) {
  if (action.type === types.myDishes.UPDATE) {
    return [...action.value];
  }
  return state;
}
