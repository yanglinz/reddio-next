import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import Skeleton from "./skeleton";

storiesOf("Skeleton", module).add("default", () => (
  <View style={{ width: 300 }}>
    <Skeleton width={300} height={40} />
  </View>
));
