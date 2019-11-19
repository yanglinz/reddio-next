import React from "react";

function IconSkipNext(props) {
  const color = props.color || "#222";
  const defaultSize = 12;
  const size = props.size || defaultSize;
  const scale = props.size / defaultSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`scale(${scale})`}>
        <path d="M0 12l8.5-6L0 0zM10 0v12h2V0z" fill={color} />
        <path d="M-6-6h24v24H-6z" fill="none" />
      </g>
    </svg>
  );
}

export default IconSkipNext;
