import immer from "immer";
import invariant from "invariant";
import { ofType, combineEpics } from "redux-observable";
import { map } from "rxjs/operators";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import isEmpty from "lodash/isEmpty";

import * as reddit from "../lib/reddit";
import * as enums from "./enums";

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
  // TODO: Fix the grep test
  const type = `PLAYER/IFRAME_${event}`;
  return { type, payload };
}

export function setPosts(posts) {
  const payload = { posts };
  return { type: "PLAYER/SET_POSTS", payload };
}

export function appendPosts(posts) {
  const payload = { posts };
  return { type: "PLAYER/APPEND_POSTS", payload };
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

function skipPostEpic(action$) {
  return action$.pipe(
    ofType("PLAYER/IFRAME_ENDED", "PLAYER/IFRAME_ERROR"),
    map(() => controlSkip())
  );
}

export const playerEpic = combineEpics(skipPostEpic);

/**
 * Reducer
 */

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
        draftState.status = enums.PlaybackStatus.INITIALIZED;
      });
    }
    case "PLAYER/IFRAME_PLAY": {
      return immer(state, draftState => {
        draftState.status = enums.PlaybackStatus.PLAYING;
      });
    }
    case "PLAYER/IFRAME_PAUSE": {
      return immer(state, draftState => {
        draftState.status = enums.PlaybackStatus.PAUSED;
      });
    }
    case "PLAYER/SET_POSTS": {
      const { posts } = action.payload;
      return immer(state, draftState => {
        draftState.posts = posts;
      });
    }
    case "PLAYER/APPEND_POSTS": {
      const { posts } = action.payload;

      const arePostsEmpty = isEmpty(state.posts) || isEmpty(posts);
      if (arePostsEmpty) {
        return state;
      }

      const arePostsConsistent = state.posts[0].name !== posts[0].name;
      if (arePostsConsistent) {
        return state;
      }

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
