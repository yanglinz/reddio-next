import React from "react";
import ReactPlayer from "react-player";

import Player from "../components/Player";

function AppPlayer() {
  const isActive = true; // TODO: use playback state to determine

  if (!isActive) {
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
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          playing
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
        <Player />
      </div>
    </div>
  );
}

export default AppPlayer;
