import * as types from './actionsTypes';

export const counterIncrement = (value) => {
  const nextValue = value + 1;
  return dispatch => dispatch({
    type: types.counter.UPDATE,
    value: {
      counter: nextValue,
    },
  });
};
