import React from "react";

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
