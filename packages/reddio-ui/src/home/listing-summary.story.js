import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import { ListingSummary } from "./listing-summary";

const posts = Array.from({ length: 10 }, (_, i) => ({
  title: "Example post",
  thumbnail: `https://picsum.photos/200/300?cache=${i}`
}));
const customInfo = {
  description: "Listentothis is the place to discover new and overlooked music."
};

storiesOf("ListingSummary", module).add("default", () => (
  <View style={{ width: 300 }}>
    <ListingSummary
      pathname="/r/listentothis"
      posts={posts}
      customInfo={customInfo}
    />
  </View>
));
