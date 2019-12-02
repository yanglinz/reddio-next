import React from "react";
import { storiesOf } from "@storybook/react";

import PlayerNext from "./PlayerNext";

storiesOf("PlayerNext", module).add("default", () => (
  <div style={{ width: "100%" }}>
    <PlayerNext />
  </div>
));
