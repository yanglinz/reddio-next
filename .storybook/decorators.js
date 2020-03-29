import React from "react";

import "../src/styles/global.css";

export function centeredDecorator(renderStory) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }
    },
    renderStory()
  );
}
