import immer from "immer";

export function setPosts(posts) {
  const payload = { posts };
  return { type: "PLAYBACK/SET_POSTS", payload };
}

export function playPost(postId) {
  const payload = { postId };
  return { type: "PLAYBACK/PLAY_POST", payload };
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
    default: {
      return state;
    }
  }
}
