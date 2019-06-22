import * as types from "./actionsTypes";

export const getDishList = value => {
  return dispatch =>
    dispatch({
      type: types.dishes.UPDATE,
      value
    });
};
