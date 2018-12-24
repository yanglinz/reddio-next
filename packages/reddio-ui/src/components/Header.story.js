import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import Header from "./Header";

storiesOf("Header", module).add("default", () => (
  <View style={{ width: 680 }}>
    <Header />
  </View>
));
