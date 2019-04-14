import immer from "immer";
import invariant from "invariant";
import { combineEpics } from "redux-observable";
import { ignoreElements } from "rxjs/operators";
import find from "lodash/find";
import findIndex from "lodash/findIndex";

import * as reddit from "../lib/reddit";

/**
 * Action creators
 */

export const iframeEvents = {
  READY: "READY",
  START: "START",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  ENDED: "ENDED",
  ERROR: "ERROR"
};

export function iframeAction(eventName, payload) {
  const event = iframeEvents[eventName];
  invariant(event, "Expected valid iframeEvent");
  const type = `PLAYER/IFRAME_${event}`;
  return { type, payload };
}

export function setPosts(posts) {
  const payload = { posts };
  return { type: "PLAYER/SET_POSTS", payload };
}

export function playPost(postId) {
  const payload = { postId };
  return { type: "PLAYER/PLAY_POST", payload };
}

export function controlPlay() {
  return { type: "PLAYER/CONTROL_PLAY" };
}

export function controlPause() {
  return { type: "PLAYER/CONTROL_PAUSE" };
}

export function controlSkip() {
  return { type: "PLAYER/CONTROL_SKIP" };
}

export function controlPrev() {
  return { type: "PLAYER/CONTROL_PREV" };
}

/**
 * Selectors
 */

export function selectActivePost(state) {
  const playerState = state.player;
  const { current, posts } = playerState;
  if (!current) {
    return null;
  }

  return find(posts, p => p.name === current);
}

/**
 * Epics
 */

function exampleEpic(action$) {
  return action$.pipe(ignoreElements());
}

export const playerEpic = combineEpics(exampleEpic);

/**
 * Reducer
 */

export const mediaStatuses = {
  INITIALIZED: "INITIALIZED",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED"
};

export const initialState = {
  status: undefined,
  // Iframe is set to playing by default so that
  // the first post is autoplayed on click
  iframePlaying: true,
  current: undefined,
  posts: []
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case "PLAYER/IFRAME_READY": {
      return immer(state, draftState => {
        draftState.status = mediaStatuses.INITIALIZED;
      });
    }
    case "PLAYER/IFRAME_PLAY": {
      return immer(state, draftState => {
        draftState.status = mediaStatuses.PLAYING;
      });
    }
    case "PLAYER/IFRAME_PAUSE": {
      return immer(state, draftState => {
        draftState.status = mediaStatuses.PAUSED;
      });
    }
    case "PLAYER/SET_POSTS": {
      const { posts } = action.payload;
      return immer(state, draftState => {
        draftState.posts = posts;
      });
    }
    case "PLAYER/PLAY_POST": {
      const { postId } = action.payload;
      return immer(state, draftState => {
        draftState.current = postId;
      });
    }
    case "PLAYER/CONTROL_PLAY": {
      return immer(state, draftState => {
        draftState.iframePlaying = true;
      });
    }
    case "PLAYER/CONTROL_PAUSE": {
      return immer(state, draftState => {
        draftState.iframePlaying = false;
      });
    }
    case "PLAYER/CONTROL_SKIP": {
      const playablePosts = state.posts.filter(p =>
        reddit.isPostPlayable(p.url)
      );
      const currentIndex = findIndex(
        playablePosts,
        p => p.name === state.current
      );

      const nextPost = playablePosts[currentIndex + 1];
      return immer(state, draftState => {
        draftState.current = nextPost ? nextPost.name : undefined;
      });
    }
    case "PLAYER/CONTROL_PREV": {
      const playablePosts = state.posts.filter(p =>
        reddit.isPostPlayable(p.url)
      );
      const currentIndex = findIndex(
        playablePosts,
        p => p.name === state.current
      );
      const prevPost = playablePosts[currentIndex - 1];
      return immer(state, draftState => {
        draftState.current = prevPost ? prevPost.name : undefined;
      });
    }
    default: {
      return state;
    }
  }
}

export default playerReducer;
