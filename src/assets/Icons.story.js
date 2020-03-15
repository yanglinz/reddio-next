import React from "react";
import { View } from "react-native-web";
import { storiesOf } from "@storybook/react";

import IconQueue from "./IconQueue";
import IconReplay from "./IconReplay";
import IconPause from "./IconPause";
import IconPlay from "./IconPlay";
import IconSkipNext from "./IconSkipNext";
import IconSkipPrev from "./IconSkipPrev";

storiesOf("Icons", module)
  .add("queue icon", () => (
    <View>
      <IconQueue size={24} />
      <IconQueue size={150} />
      <IconQueue size={250} />
    </View>
  ))
  .add("replay icon", () => (
    <View>
      <IconReplay size={24} />
      <IconReplay size={150} />
      <IconReplay size={250} />
    </View>
  ))
  .add("play icon", () => (
    <View>
      <IconPlay size={24} />
      <IconPlay size={150} />
      <IconPlay size={250} />
    </View>
  ))
  .add("pause icon", () => (
    <View>
      <IconPause size={24} />
      <IconPause size={150} />
      <IconPause size={250} />
    </View>
  ))
  .add("skip next icon", () => (
    <View>
      <IconSkipNext size={24} />
      <IconSkipNext size={150} />
      <IconSkipNext size={250} />
    </View>
  ))
  .add("skip prev icon", () => (
    <View>
      <IconSkipPrev size={24} />
      <IconSkipPrev size={150} />
      <IconSkipPrev size={250} />
    </View>
  ));
