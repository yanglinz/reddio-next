import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import noop from "lodash/noop";

import PlayerNext from "./PlayerNext";
import * as playerStore from "../../store/player";
import * as enums from "../../enums";

function mapStateToProps(state) {
  return {
    status: state.player.status,
    iframePlaying: state.player.iframePlaying,
    activePost: playerStore.selectActivePost(state)
  };
}

function AppPlayer(props) {
  const { dispatch, status, iframePlaying, activePost } = props;
  const { iframeEvents } = playerStore;

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
        {activePost ? (
          <ReactPlayer
            width={350}
            height={165}
            url={activePost.url}
            controls
            playing={iframePlaying}
            onReady={() =>
              dispatch(playerStore.iframeAction(iframeEvents.READY))
            }
            onStart={() =>
              dispatch(playerStore.iframeAction(iframeEvents.START))
            }
            onPlay={() => dispatch(playerStore.iframeAction(iframeEvents.PLAY))}
            onPause={() =>
              dispatch(playerStore.iframeAction(iframeEvents.PAUSE))
            }
            onEnded={() =>
              dispatch(playerStore.iframeAction(iframeEvents.ENDED))
            }
            onError={() =>
              dispatch(playerStore.iframeAction(iframeEvents.ERROR))
            }
            onProgress={noop}
            onDuration={noop}
            onBuffer={noop}
            onSeek={noop}
          />
        ) : null}
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
        <PlayerNext
          status={status || enums.PlaybackStatus.INITIALIZED}
          onClickPlayPause={() => {
            if (status === enums.PlaybackStatus.INITIALIZED) {
              // Do nothing
            } else if (status === enums.PlaybackStatus.PAUSED) {
              dispatch(playerStore.controlPlay());
            } else if (status === enums.PlaybackStatus.PLAYING) {
              dispatch(playerStore.controlPause());
            }
          }}
          onClickPrev={() => dispatch(playerStore.controlPrev())}
          onClickext={() => dispatch(playerStore.controlSkip())}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(AppPlayer);
