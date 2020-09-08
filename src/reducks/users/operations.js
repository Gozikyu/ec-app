import {
  signInAction,
  signOutAction,
  fetchProductsInCartAction,
  fetchProductsInFavoriteAction,
  fetchOrderHistoryAction,
} from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

const userRef = db.collection("users");

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                admin: data.admin,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("メールアドレスが入力されていません。");
      return false;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたメールアドレスにパスワードリセット用のメールをお送りしました。"
        );
        dispatch(push("signin"));
      })
      .catch(() => {
        alert("パスワードのリセットに失敗しました。通信環境をご確認ください。");
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch, getState) => {
    if (email === "" || password === "") {
      alert("必須項目が入力されていません。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      const uid = user.uid;

      const users = getState().users;

      db.collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: data.uid,
              username: data.username,
              admin: data.admin,
            })
          );
          dispatch(push("/"));
        });
    });
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    const users = getState().users;
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が入力されていません。");
      return false;
    }
    if (password !== confirmPassword) {
      alert("パスワードと確認用パスワードが一致しません");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "costomer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            admin: false,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = db.collection("users").doc(uid).collection("cart").doc();
    addedProduct["cartId"] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push("/"));
  };
};

export const addProductToFavorite = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const favoriteRef = db
      .collection("users")
      .doc(uid)
      .collection("favorite")
      .doc();
    addedProduct["favoriteId"] = favoriteRef.id;
    await favoriteRef.set(addedProduct);
    dispatch(push("/"));
  };
};

export const fetchProductsInCart = (productsInCart) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(productsInCart));
  };
};

export const fetchProductsInFavorite = (fetchProductsInFavorite) => {
  return async (dispatch) => {
    dispatch(fetchProductsInFavoriteAction(fetchProductsInFavorite));
  };
};

export const fetchOrderHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const list = [];

    userRef
      .doc(uid)
      .collection("orders")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const orders = snapshot.data();
          list.push(orders);
        });

        dispatch(fetchOrderHistoryAction(list));
      });
  };
};
