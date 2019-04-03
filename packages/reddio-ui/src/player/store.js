import immer from "immer";
import find from "lodash/find";

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

export const initialState = {
  current: undefined,
  posts: []
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
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
