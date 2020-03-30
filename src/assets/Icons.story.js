import React from "react";
import { storiesOf } from "@storybook/react";

import IconQueue from "./IconQueue";
import IconReplay from "./IconReplay";
import IconPause from "./IconPause";
import IconPlay from "./IconPlay";
import IconSkipNext from "./IconSkipNext";
import IconSkipPrev from "./IconSkipPrev";

storiesOf("Icons", module)
  .add("queue icon", () => (
    <div>
      <IconQueue size={24} />
      <IconQueue size={150} />
      <IconQueue size={250} />
    </div>
  ))
  .add("replay icon", () => (
    <div>
      <IconReplay size={24} />
      <IconReplay size={150} />
      <IconReplay size={250} />
    </div>
  ))
  .add("play icon", () => (
    <div>
      <IconPlay size={24} />
      <IconPlay size={150} />
      <IconPlay size={250} />
    </div>
  ))
  .add("pause icon", () => (
    <div>
      <IconPause size={24} />
      <IconPause size={150} />
      <IconPause size={250} />
    </div>
  ))
  .add("skip next icon", () => (
    <div>
      <IconSkipNext size={24} />
      <IconSkipNext size={150} />
      <IconSkipNext size={250} />
    </div>
  ))
  .add("skip prev icon", () => (
    <div>
      <IconSkipPrev size={24} />
      <IconSkipPrev size={150} />
      <IconSkipPrev size={250} />
    </div>
  ));
