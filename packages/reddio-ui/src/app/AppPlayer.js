import React from "react";
import Player from "../components/Player";

import "./AppPlayer.css";

function AppPlayer() {
  const isActive = true; // TODO: use playback state to determine

  if (!isActive) {
    return null;
  }

  return (
    <div className="AppPlayer">
      <Player />
    </div>
  );
}

export default AppPlayer;
