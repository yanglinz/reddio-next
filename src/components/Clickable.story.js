import React from "react";
import { storiesOf } from "@storybook/react";

import Clickable from "./Clickable";
import * as design from "../design";

function Box(props) {
  return (
    <div
      style={{
        width: 300,
        height: 180,
        backgroundColor: design.colors.primary.c4
      }}
    >
      {props.children}
    </div>
  );
}

storiesOf("Clickable", module)
  .add("default", () => (
    <Clickable>
      <Box />
    </Clickable>
  ))
  .add("focus only on tab", () => (
    <Clickable focusOnlyOnTab>
      <Box />
    </Clickable>
  ));
