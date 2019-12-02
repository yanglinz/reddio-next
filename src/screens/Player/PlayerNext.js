import React from "react";

import PlayPause from "./PlayPause";
import IconSkipNext from "../../assets/IconSkipNext";
import IconSkipPrev from "../../assets/IconSkipPrev";
import { Inline, Spacing } from "../../components/Spacing";

import "./PlayerNext.scss";

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
