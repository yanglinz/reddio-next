import React from "react";
import { storiesOf } from "@storybook/react";

import ListingPost, { ListingPostSkeleton } from "./ListingPost";

function Container(props) {
  return <div style={{ width: 700, height: 150 }}>{props.children}</div>;
}

storiesOf("ListingPost", module)
  .add("default", () => (
    <Container>
      <ListingPost
        name="123"
        numComments={1}
        score={123}
        title="Some post title"
        thumbnail="https://picsum.photos/id/100/200/300"
      />
    </Container>
  ))
  .add("skeleton", () => (
    <Container>
      <ListingPostSkeleton seed={1} />
    </Container>
  ));
