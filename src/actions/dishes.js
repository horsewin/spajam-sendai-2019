import * as types from "./actionsTypes";

export const updateDishList = value => {
  return dispatch =>
    dispatch({
      type: types.dishes.UPDATE,
      value
    });
};
