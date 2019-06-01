import * as fc from "fast-check";

import * as store from "./store";

describe("player store generative test", () => {
  function postArb() {
    return fc.record({
      name: fc.hexaString(10, 20),
      title: fc.string(),
      author: fc.string(),
      thumbnail: fc.webUrl(),
      url: fc.webUrl(),
      numComments: fc.integer(0, 10000),
      score: fc.integer(0, 10000)
    });
  }

  function iframeActionArb() {
    const actionType = fc.constantFrom(
      "PLAYER/IFRAME_READY",
      "PLAYER/IFRAME_START",
      "PLAYER/IFRAME_PLAY",
      "PLAYER/IFRAME_PAUSE",
      "PLAYER/IFRAME_ENDED",
      "PLAYER/IFRAME_ERROR"
    );
    return fc.record({ type: actionType });
  }

  function setPostActionArb() {
    return fc.record({
      type: fc.constant("PLAYER/SET_POSTS"),
      payload: fc.record({
        posts: fc.array(postArb())
      })
    });
  }

  function appendPostActionArb() {
    return fc.record({
      type: fc.constant("PLAYER/APPEND_POSTS"),
      payload: fc.record({
        posts: fc.array(postArb())
      })
    });
  }

  function playPostActionArb() {
    return fc.record({
      type: fc.constant("PLAYER/PLAY_POST"),
      payload: fc.record({
        postId: fc.hexaString(10, 20)
      })
    });
  }

  function playerActionArb() {
    const actionType = fc.constantFrom(
      "PLAYER/CONTROL_PLAY",
      "PLAYER/CONTROL_PAUSE",
      "PLAYER/CONTROL_SKIP",
      "PLAYER/CONTROL_PREV"
    );
    return fc.record({ type: actionType });
  }

  function actionArb() {
    return fc.oneof(
      iframeActionArb(),
      setPostActionArb(),
      appendPostActionArb(),
      playPostActionArb(),
      playerActionArb()
    );
  }

  it("it reduces properly", () => {
    let state = {
      ...store.initialState
    };

    fc.assert(
      fc.property(actionArb(), action => {
        state = playerReducer(state, action);
      })
    );
  });
});
