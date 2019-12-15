import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import Clickable from "../../components/Clickable";
import IconPlay from "../../assets/IconPlay";
import IconPause from "../../assets/IconPause";
import * as design from "../../design";
import * as enums from "../../enums";

function BackgroundCircle(props) {
  const { status, size } = props;

  const circle = (
    <svg viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={design.colors.primaryAlt.c5}
      />
      <rect
        width={size / 2}
        height={size / 2}
        x={size / 4}
        y={size / 4}
        fill="#fefefe"
      />
    </svg>
  );

  return status === enums.PlaybackStatus.INITIALIZED ? (
    circle
  ) : (
    <motion.div
      whileTap={{
        scale: 1.25,
        opacity: 0.5
      }}
    >
      {circle}
    </motion.div>
  );
}

function ForegroundIcon(props) {
  const { status, size } = props;

  let icon = null;
  if (status === enums.PlaybackStatus.INITIALIZED) {
    icon = <IconPlay size={size} color={design.colors.neutral.c9} />;
  } else if (status === enums.PlaybackStatus.PLAYING) {
    icon = <IconPause size={size} />;
  } else {
    icon = <IconPlay size={size} />;
  }

  return (
    <div
      style={{
        // position it
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // center the element
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // make it unclickable
        pointerEvents: "none"
      }}
    >
      {icon}
    </div>
  );
}

function PlayPause(props) {
  const { status, onClick } = props;
  const size = props.size || 70;
  const isDisabled = status === enums.PlaybackStatus.INITIALIZED;

  return (
    <Clickable onClick={onClick} focusOnlyOnTab isDisabled={isDisabled}>
      <div
        className={classNames("PlayPause", {
          "PlayPause-disabled": isDisabled
        })}
        style={{ position: "relative", width: size, height: size }}
      >
        <BackgroundCircle status={status} size={size} />
        <ForegroundIcon status={status} size={size} />
      </div>
    </Clickable>
  );
}

export default PlayPause;
