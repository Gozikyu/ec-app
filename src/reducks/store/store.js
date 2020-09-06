import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { ProductReducer } from "../products/reducers";
import { UserReducer } from "../users/reducers";

export default function createStore(history) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });

  return reduxCreateStore(
    combineReducers({
      products: ProductReducer,
      router: connectRouter(history),
      users: UserReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk, logger)
  );
}
