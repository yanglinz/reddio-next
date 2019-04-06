import immer from "immer";
import invariant from "invariant";
import find from "lodash/find";

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

export function selectActivePost(state) {
  const playerState = state.player;
  const { current, posts } = playerState;
  if (!current) {
    return null;
  }

  return find(posts, p => p.name === current);
}

export const mediaStatuses = {
  INITIALIZED: "INITIALIZED",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED"
};

export const initialState = {
  status: undefined,
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
    default: {
      return state;
    }
  }
}

export default playerReducer;
