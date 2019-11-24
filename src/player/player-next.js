import React from "react";

import PlayPause from "./play-pause";
import IconQueue from "../assets/icon-queue";
import IconReplay from "../assets/icon-replay";
import IconSkipNext from "../assets/icon-skip-next";
import IconSkipPrev from "../assets/icon-skip-prev";

import "./player-next.scss";

function PlayerNext() {
  return (
    <div className="PlayerNext">
      <div className="PlayerNext-controls">
        <IconReplay />
        <IconSkipPrev />
        <PlayPause />
        <IconSkipNext />
        <IconQueue />
      </div>
    </div>
  );
}

export default PlayerNext;
