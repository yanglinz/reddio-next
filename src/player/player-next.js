import React from "react";

import PlayPause from "./play-pause";

import "./player-next.scss";

function PlayerNext() {
  return (
    <div className="PlayerNext">
      <div className="PlayerNext-controls">
        <PlayPause />
      </div>
    </div>
  );
}

export default PlayerNext;
