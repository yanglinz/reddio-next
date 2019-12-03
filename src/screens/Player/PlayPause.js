import React from "react";
import { motion } from "framer-motion";

import Clickable from "../../components/Clickable";
import IconPlay from "../../assets/IconPlay";
import IconPause from "../../assets/IconPause";
import * as design from "../../design";

export const Status = {
  DISABLED: "DISABLED",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED"
};

function PlayPause(props) {
  const { status, onClick } = props;
  const size = props.size || 70;
  return (
    <Clickable onClick={onClick}>
      <div
        className="PlayPause"
        style={{ position: "relative", width: size, height: size }}
      >
        <motion.div
          whileTap={{
            scale: 1.25,
            opacity: 0.5
          }}
        >
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
        </motion.div>

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
          {status === Status.PLAYING ? (
            <IconPlay size={70} />
          ) : (
            <IconPause size={70} />
          )}
        </div>
      </div>
    </Clickable>
  );
}

export default PlayPause;
