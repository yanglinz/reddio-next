import React from "react";

import * as design from "../styles/design";

import styles from "./LogoAnimation.module.scss";

function getWavePath(w, h) {
  const m = 0.512286623256592433;
  const a = h / 4;
  const y = h / 2;

  // prettier-ignore
  const pathStart = [
    "M", w * 0, y + a / 2, "c", a * m,
    0, -(1 - a) * m, -a, a, -a,
  ];
  // prettier-ignore
  const pathRepeat = [
    "s", -(1 - a) * m, a, a, a,
    "s", -(1 - a) * m, -a, a, -a,
  ];

  return []
    .concat(
      pathStart,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat,
      pathRepeat
    )
    .join(" ");
}

function LogoAnimation(props) {
  // Taken from https://varun.ca/chillwave/
  const height = 30;
  const pathData = getWavePath(90, height);
  return (
    <div className={styles.Logo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={height}
        viewBox={`5 0 80 ${height}`}
      >
        <path
          className={styles.WavePath}
          fill="none"
          stroke={design.colors.primary.c5}
          strokeWidth="2"
          d={pathData}
        ></path>
      </svg>
    </div>
  );
}

export default LogoAnimation;
