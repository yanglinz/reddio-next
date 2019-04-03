import { applyMiddleware, createStore, combineReducers } from "redux";
import { createLogger } from "redux-logger";

import playerReducer from "./player/store";

const rootReducer = combineReducers({
  player: playerReducer
});

export function createReduxStore() {
  const logger = createLogger({ collapsed: true });
  const middleware = applyMiddleware(logger);
  return createStore(rootReducer, middleware);
}

const store = createReduxStore();
export default store;
