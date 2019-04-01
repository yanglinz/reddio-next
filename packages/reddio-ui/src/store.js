import { applyMiddleware, createStore, combineReducers } from "redux";
import { createLogger } from "redux-logger";

import { playbackReducer } from "./app/PlaybackStore";

const rootReducer = combineReducers({
  playback: playbackReducer
});

export function createReduxStore() {
  const logger = createLogger({ collapsed: true });
  const middleware = applyMiddleware(logger);
  return createStore(rootReducer, middleware);
}

const store = createReduxStore();
export default store;
