import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";

import PlayerControls from "./controls";
import * as playerStore from "./store";

function mapStateToProps(state) {
  return {
    activePost: playerStore.selectActivePost(state)
  };
}

function AppPlayer(props) {
  const { activePost } = props;

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
          playing={false}
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
        <PlayerControls />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(AppPlayer);
