import immer from "immer";
import find from "lodash/find";

export function setPosts(posts) {
  const payload = { posts };
  return { type: "PLAYBACK/SET_POSTS", payload };
}

export function playPost(postId) {
  const payload = { postId };
  return { type: "PLAYBACK/PLAY_POST", payload };
}

export function selectActivePost(state) {
  const playbackState = state.playback;
  const { current, posts } = playbackState;
  if (!current) {
    return null;
  }

  return find(posts, p => p.name === current);
}

export const initialState = {
  current: undefined,
  posts: []
};

export function playbackReducer(state = initialState, action) {
  switch (action.type) {
    case "PLAYBACK/SET_POSTS": {
      const { posts } = action.payload;
      return immer(state, draftState => {
        draftState.posts = posts;
      });
    }
    case "PLAYBACK/PLAY_POST": {
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
