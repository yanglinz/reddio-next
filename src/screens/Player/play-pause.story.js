import React from "./node_modules/react";
import { View } from "react-native";
import { storiesOf } from "./node_modules/@storybook/react";

import PlayPause from "./PlayPause";

storiesOf("PlayPause", module).add("default", () => (
  <View>
    <PlayPause />
  </View>
));
