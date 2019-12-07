import React from "react";
import { motion } from "framer-motion";

import Clickable from "../../components/Clickable";
import PlayPause from "./PlayPause";
import IconSkipNext from "../../assets/IconSkipNext";
import IconSkipPrev from "../../assets/IconSkipPrev";
import { Inline, Spacing } from "../../components/Spacing";

import "./PlayerNext.scss";

export { Status } from "./PlayPause";

function PlayerNext(props) {
  const { status, onClickPlayPause, onClickPrev, onClickNext } = props;
  return (
    <div className="PlayerNext">
      <div className="PlayerNext-controls">
        <Inline spacing={Spacing.L}>
          <Clickable onClick={onClickPrev} focusOnlyOnTab>
            <motion.div
              whileTap={{ opacity: 0.2 }}
              transition={{
                duration: 0.3
              }}
            >
              <IconSkipPrev size={22} />
            </motion.div>
          </Clickable>

          <PlayPause status={status} onClick={onClickPlayPause} />

          <Clickable onClick={onClickNext} focusOnlyOnTab>
            <motion.div
              whileTap={{ opacity: 0.2 }}
              transition={{
                duration: 0.3
              }}
            >
              <IconSkipNext size={22} />
            </motion.div>
          </Clickable>
        </Inline>
      </div>
    </div>
  );
}

export default PlayerNext;
