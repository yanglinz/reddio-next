import React, { useState } from "react";
import isString from "lodash/isString";

import * as random from "../lib/random";

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

export function ThumbnailLarge(props) {
  const [errored, setErrored] = useState(false);

  const { title, width, height, src, seed } = props;
  const color = getRandomColor(seed);
  const showImage = !errored && src;
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: color
      }}
    >
      {showImage ? (
        <img
          src={src}
          width={width}
          height={height}
          alt={title}
          onError={() => setErrored(true)}
        />
      ) : null}
    </div>
  );
}

function ThumbnailSmall(props) {
  const [errored, setErrored] = useState(false);

  const { title, width, height, src, seed } = props;
  const color = getRandomColor(seed);
  const showImage = !errored && src;
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: color
      }}
    >
      {showImage ? (
        <img
          src={src}
          width={width}
          height={height}
          alt={title}
          onError={() => setErrored(true)}
        />
      ) : null}
    </div>
  );
}

function Thumbnail(props) {
  const { title, width, height, src, seed } = props;

  if (width > 75 && height > 75) {
    return (
      <ThumbnailLarge
        title={title}
        width={width}
        height={height}
        src={src}
        seed={seed}
      />
    );
  }

  return (
    <ThumbnailSmall
      title={title}
      width={width}
      height={height}
      src={src}
      seed={seed}
    />
  );
}

export default Thumbnail;
