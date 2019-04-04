import immer from "immer";
import find from "lodash/find";

export function initializing() {
  return { type: "PLAYER/INITIALIZING" };
}

export function starting() {
  return { type: "PLAYER/STARTING" };
}

export function playing() {
  return { type: "PLAYER/PLAYING" };
}
export function pausing() {
  return { type: "PLAYER/PAUSING" };
}

export function ending() {
  return { type: "PLAYER/ENDING" };
}

export function erroring() {
  return { type: "PLAYER/ERRORING" };
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
    case "PLAYER/INITIALIZING": {
      return immer(state, draftState => {
        draftState.status = mediaStatuses.INITIALIZED;
      });
    }
    case "PLAYER/PLAYING": {
      return immer(state, draftState => {
        draftState.status = mediaStatuses.PLAYING;
      });
    }
    case "PLAYER/PAUSING": {
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
