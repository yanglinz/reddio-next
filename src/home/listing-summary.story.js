import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";

import { ListingSummary, ListingSummarySkeleton } from "./listing-summary";

const posts = Array.from({ length: 10 }, (_, i) => ({
  title: "Example post",
  thumbnail: `https://picsum.photos/id/${i}${i}/200/300`
}));
const customInfo = {
  description: "Listentothis is the place to discover new and overlooked music."
};

function Container(props) {
  return <View style={{ width: 300, height: 300 }}>{props.children}</View>;
}

storiesOf("ListingSummary", module)
  .add("default", () => (
    <Container>
      <ListingSummary
        pathname="/r/listentothis"
        posts={posts}
        customInfo={customInfo}
      />
    </Container>
  ))
  .add("skeleton", () => (
    <Container>
      <ListingSummarySkeleton />
    </Container>
  ));
