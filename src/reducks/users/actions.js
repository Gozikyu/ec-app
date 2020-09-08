export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: "",
      uid: userState.uid,
      username: userState.username,
      admin: userState.admin,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      cart: [],
      orders: [],
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
      admin: false,
    },
  };
};

export const FETCH_PRODUCT_IN_CART = "FETCH_PRODUCT_IN_CART";
export const fetchProductsInCartAction = (productsInCart) => {
  return {
    type: "FETCH_PRODUCT_IN_CART",
    payload: productsInCart,
  };
};

export const FETCH_PRODUCT_IN_FAVORITE = "FETCH_PRODUCT_IN_FAVORITE";
export const fetchProductsInFavoriteAction = (productsInFavorite) => {
  return {
    type: "FETCH_PRODUCT_IN_FAVORITE",
    payload: productsInFavorite,
  };
};

export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY";
export const fetchOrderHistoryAction = (orders) => {
  return {
    type: "FETCH_ORDER_HISTORY",
    payload: orders,
  };
};
