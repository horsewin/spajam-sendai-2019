import * as types from "./actionsTypes";

export const restaurantSelect = value => {
  return dispatch =>
    dispatch({
      type: types.restaurant.UPDATE,
      value
    });
};
