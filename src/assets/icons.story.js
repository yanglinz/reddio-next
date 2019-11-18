import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import IconPause from "./icon-pause";
import IconPlay from "./icon-play";

storiesOf("Icons", module)
  .add("play icon", () => (
    <View style={{ width: 300 }}>
      <IconPlay size={24} />
      <IconPlay size={150} />
      <IconPlay size={250} />
    </View>
  ))
  .add("pause icon", () => (
    <View style={{ width: 300 }}>
      <IconPause size={24} />
      <IconPause size={150} />
      <IconPause size={250} />
    </View>
  ));
