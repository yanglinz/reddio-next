import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import noop from "lodash/noop";

import PlayerControls from "./controls";
import * as playerStore from "./store";

function mapStateToProps(state) {
  return {
    status: state.player.status,
    activePost: playerStore.selectActivePost(state)
  };
}

function AppPlayer(props) {
  const { dispatch, status, activePost } = props;

  if (!activePost) {
    return null;
  }

  return (
    <div className="AppPlayer">
      <div
        style={{
          zIndex: 2,
          position: "fixed",
          bottom: 90,
          right: 20
        }}
      >
        <ReactPlayer
          width={350}
          height={165}
          url={activePost.url}
          controls
          playing={true}
          onReady={() => dispatch(playerStore.initializing())}
          onStart={() => dispatch(playerStore.starting())}
          onPlay={() => dispatch(playerStore.playing())}
          onPause={() => dispatch(playerStore.pausing())}
          onEnded={() => dispatch(playerStore.ending())}
          onError={() => dispatch(playerStore.erroring())}
          onProgress={noop}
          onDuration={noop}
          onBuffer={noop}
          onSeek={noop}
        />
      </div>

      <div
        style={{
          zIndex: 2,
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fff"
        }}
      >
        <PlayerControls status={status} />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(AppPlayer);
