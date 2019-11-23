import React from "react";

function IconReplay(props) {
  const color = props.color || "#222";
  const defaultSize = 20;
  const size = props.size || defaultSize;
  const scale = size / defaultSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`scale(${scale})`}>
        <path d="M-4-1h24v24H-4z" fill="none" />
        <path
          d="M8 4V0L3 5l5 5V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H0c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export default IconReplay;
