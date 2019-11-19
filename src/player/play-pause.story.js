import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import PlayPause from "./play-pause";

storiesOf("PlayPause", module).add("default", () => (
  <View>
    <PlayPause />
  </View>
));
