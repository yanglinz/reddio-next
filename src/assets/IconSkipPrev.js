import React from "react";

function IconSkipPrev(props) {
  const color = props.color || "#222";
  const defaultSize = 12;
  const size = props.size || defaultSize;
  const scale = size / defaultSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`scale(${scale})`}>
        <path d="M0 0h2v12H0zm3.5 6l8.5 6V0z" fill={color} />
        <path d="M-6-6h24v24H-6z" fill="none" />
      </g>
    </svg>
  );
}

export default IconSkipPrev;
