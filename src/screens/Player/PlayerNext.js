import React from "react";
import { motion } from "framer-motion";

import PlayPause from "./PlayPause";
import IconSkipNext from "../../assets/IconSkipNext";
import IconSkipPrev from "../../assets/IconSkipPrev";
import Clickable from "../../components/Clickable";
import { Inline, Spacing } from "../../components/Spacing";
import * as enums from "../../enums";
import * as design from "../../design";

import "./PlayerNext.scss";

function InteractiveIcon(props) {
  const { status, onClick, children } = props;

  const isDisabled = status === enums.PlaybackStatus.INITIALIZED;
  const color = isDisabled ? design.colors.neutral.c9 : undefined;
  const icon = React.cloneElement(children, { color });
  return (
    <Clickable onClick={onClick} focusOnlyOnTab isDisabled={isDisabled}>
      {isDisabled ? (
        icon
      ) : (
        <motion.div
          whileTap={{ opacity: 0.2 }}
          transition={{
            duration: 0.3
          }}
        >
          {icon}
        </motion.div>
      )}
    </Clickable>
  );
}

function PlayerNext(props) {
  const { status, onClickPlayPause, onClickPrev, onClickNext } = props;
  return (
    <div className="PlayerNext">
      <div className="PlayerNext-controls">
        <Inline spacing={Spacing.L}>
          <InteractiveIcon status={status} onClick={onClickPrev}>
            <IconSkipPrev size={22} />
          </InteractiveIcon>

          <PlayPause status={status} onClick={onClickPlayPause} />

          <InteractiveIcon status={status} onClick={onClickNext}>
            <IconSkipNext size={22} />
          </InteractiveIcon>
        </Inline>
      </div>
    </div>
  );
}

export default PlayerNext;
