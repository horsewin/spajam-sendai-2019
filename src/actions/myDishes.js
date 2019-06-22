import * as types from "./actionsTypes";

export const updateMyDishList = value => {
  return dispatch =>
    dispatch({
      type: types.myDishes.UPDATE,
      value
    });
};
