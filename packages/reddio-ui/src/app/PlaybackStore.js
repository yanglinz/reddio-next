export function setPosts(posts) {
  const payload = { posts };
  return { type: "PLAYBACK/SET_POSTS", payload };
}

export const initialState = {
  current: undefined,
  posts: []
};

export function playbackReducer(state = initialState, action) {
  if (action) {
    // TODO: implement real reducer
    return state;
  }

  return state;
}
