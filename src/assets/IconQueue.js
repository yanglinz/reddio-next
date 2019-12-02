import React from "react";

function IconQueue(props) {
  const color = props.color || "#222";
  const defaultSize = 19;
  const size = props.size || defaultSize;
  const scale = size / defaultSize;
  const width = size;
  const height = width * (14 / 19);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`scale(${scale})`}>
        <path d="M-3-6h24v24H-3z" fill="none" />
        <path
          d="M12 0H0v2h12zm0 4H0v2h12zM0 10h8V8H0zM14 0v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V2h3V0z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export default IconQueue;
