import React from "react";
import { storiesOf } from "@storybook/react";

import Clickable from "./Clickable";
import Placeholder from "./Placeholder";

storiesOf("Clickable", module)
  .add("default", () => (
    <Clickable>
      <Placeholder width={300} height={120} text="Clickable" />
    </Clickable>
  ))
  .add("focus only on tab", () => (
    <Clickable focusOnlyOnTab>
      <Placeholder width={300} height={120} text="Clickable" />
    </Clickable>
  ))
  .add("disabled", () => (
    <Clickable isDisabled>
      <Placeholder width={300} height={120} text="Clickable" />
    </Clickable>
  ));
