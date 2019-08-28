import { applyMiddleware, createStore, combineReducers } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import playerReducer from "./player/store";
import { playerEpic } from "./player/store";

const rootEpic = combineEpics(playerEpic);

const rootReducer = combineReducers({
  player: playerReducer
});

export function createReduxStore() {
  const logger = createLogger({ collapsed: true });
  const reduxObservable = createEpicMiddleware();
  const middleware = applyMiddleware(logger, reduxObservable);
  const store = createStore(rootReducer, middleware);
  reduxObservable.run(rootEpic);
  return store;
}

const store = createReduxStore();
export default store;
