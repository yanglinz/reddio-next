import React from "react";
import { storiesOf } from "@storybook/react";

import ListingHeader from "./ListingHeader";

function Container(props) {
  return (
    <div width={400} height={300}>
      {props.children}
    </div>
  );
}

storiesOf("ListingHeader", module)
  .add("default", () => (
    <Container>
      <ListingHeader
        pathname="/r/listentothis"
        info={{
          __typename: "ListingSubredditInfo",
          info: {
            subscribers: 1337
          }
        }}
      />
    </Container>
  ))
  .add("skeleton", () => (
    <Container>
      <ListingHeader pathname="/r/listentothis" />
    </Container>
  ));
