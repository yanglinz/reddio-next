import React from "react";

function IconPause(props) {
  const color = props.color || "#222";
  const defaultSize = 20;
  const size = props.size || defaultSize;
  const scale = size / defaultSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`scale(${scale})`}>
        <path d="M-2-2h24v24H-2z" fill="none" />
        <path
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 14H7V6h2zm4 0h-2V6h2z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export default IconPause;
