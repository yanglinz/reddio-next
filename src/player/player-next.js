import React from "react";

import PlayPause from "./play-pause";
import IconSkipNext from "../assets/icon-skip-next";
import IconSkipPrev from "../assets/icon-skip-prev";

import "./player-next.scss";

function PlayerNext() {
  return (
    <div className="PlayerNext">
      <div className="PlayerNext-controls">
        <IconSkipPrev />
        <PlayPause />
        <IconSkipNext />
      </div>
    </div>
  );
}

export default PlayerNext;
