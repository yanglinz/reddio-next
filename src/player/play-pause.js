import React from "react";
import { motion } from "framer-motion";

import IconPlay from "../assets/icon-play";

function PlayPause(props) {
  const size = props.size || 100;
  return (
    <div
      className="PlayPause"
      style={{ position: "relative", width: size, height: size }}
    >
      <motion.div
        whileTap={{
          scale: 3.5,
          opacity: 1
        }}
      >
        <svg viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={size / 4} fill="#eee" />
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
        <IconPlay size={200} />
      </div>
    </div>
  );
}

export default PlayPause;
