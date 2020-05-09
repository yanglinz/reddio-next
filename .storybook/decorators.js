import React from "react";

import "normalize.css/normalize.css";
import "@reach/listbox/styles.css";
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
