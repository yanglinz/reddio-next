import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import IconPause from "./icon-pause";
import IconPlay from "./icon-play";
import IconSkipNext from "./icon-skip-next";
import IconSkipPrev from "./icon-skip-prev";

storiesOf("Icons", module)
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
