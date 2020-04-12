import React, { useState } from "react";
import isString from "lodash/isString";

import * as random from "../lib/random";

import styles from "./Thumbnail.module.scss";

const colors = [
  "#ef9a9a",
  "#f48fb1",
  "#ce93d8",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#81d4fa",
  "#80deea",
  "#80cbc4",
  "#a5d6a7",
  "#c5e1a5",
  "#e6ee9c",
  "#fff59d",
  "#ffe082",
  "#ffcc80",
  "#ffab91",
  "#bcaaa4",
  "#eeeeee",
  "#b0bec5"
];

function getRandomColor(seed) {
  // Choose a color randomly based on a seed
  let color = colors[0];
  try {
    const rngSeed = isString(seed) ? random.hash(seed) : seed;
    const randomInt = new random.SeededRandom(rngSeed).next();
    color = colors[randomInt % colors.length];
  } catch (e) {
    // Do nothing
  }

  return color;
}

function ThumbnailImage(props) {
  const { width, height, src } = props;
  const style = {
    backgroundImage: `url(${src})`,
    width,
    height
  };
  return <div className={styles.ThumbnailImage} style={style} />;
}

function ThumbnailSmall(props) {
  const { width, height, src, seed } = props;
  return (
    <div
      className={styles.ThumbnailSmall}
      style={{
        width: width,
        height: height,
        backgroundColor: getRandomColor(seed)
      }}
    >
      <ThumbnailImage src={src} width={width} height={height} />
    </div>
  );
}

function ThumbnailLarge(props) {
  const { width, height, src, seed } = props;
  const foregroundRatio = 66 / 100;
  return (
    <div
      className={styles.ThumbnailLarge}
      style={{
        width: width,
        height: height,
        backgroundColor: getRandomColor(seed)
      }}
    >
      <div className={styles.ThumbnailLargeForeground}>
        <ThumbnailImage
          src={src}
          width={width * foregroundRatio}
          height={height * foregroundRatio}
        />
      </div>
      <div className={styles.ThumbnailLargeBackground}>
        <ThumbnailImage src={src} width={width} height={height} />
      </div>
    </div>
  );
}

function Thumbnail(props) {
  const { width, height, src, seed } = props;

  if (width > 75 && height > 75) {
    return (
      <ThumbnailLarge width={width} height={height} src={src} seed={seed} />
    );
  }

  return <ThumbnailSmall width={width} height={height} src={src} seed={seed} />;
}

export default Thumbnail;
