import { createSelector } from "reselect";

export const userSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector(
  [userSelector],
  (state) => state.username
);

export const getProductsInCart = createSelector(
  [userSelector],
  (state) => state.cart
);

export const getProductsInFavorite = createSelector(
  [userSelector],
  (state) => state.favorite
);

export const getOrderHistory = createSelector(
  [userSelector],
  (state) => state.orders
);

export const getIsAdmin = createSelector(
  [userSelector],
  (state) => state.admin
);
