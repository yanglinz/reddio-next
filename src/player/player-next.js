import React from "react";

import PlayPause from "./play-pause";
import IconSkipNext from "../assets/icon-skip-next";
import IconSkipPrev from "../assets/icon-skip-prev";
import { Inline, Spacing } from "../design/spacing";

import "./player-next.scss";

function PlayerNext() {
  return (
    <div className="PlayerNext">
      <div className="PlayerNext-controls">
        <Inline spacing={Spacing.L}>
          <IconSkipPrev size={22} />
          <PlayPause />
          <IconSkipNext size={22} />
        </Inline>
      </div>
    </div>
  );
}

export default PlayerNext;
