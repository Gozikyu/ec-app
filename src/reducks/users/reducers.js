import * as Actions from "./actions.js";
import initialState from "../store/initialState.js";

export const UserReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      };

    case Actions.FETCH_PRODUCT_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      };

    case Actions.FETCH_PRODUCT_IN_FAVORITE:
      return {
        ...state,
        favorite: [...action.payload],
      };

    case Actions.FETCH_ORDER_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      };
    default:
      return state;
  }
};
