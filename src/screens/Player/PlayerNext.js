import React from "react";

import Clickable from "../../components/Clickable";
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
          <Clickable onClick={() => {}} focusOnlyOnTab>
            <IconSkipPrev size={22} />
          </Clickable>

          <PlayPause />

          <Clickable onClick={() => {}} focusOnlyOnTab>
            <IconSkipNext size={22} />
          </Clickable>
        </Inline>
      </div>
    </div>
  );
}

export default PlayerNext;
