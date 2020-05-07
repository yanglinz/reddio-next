import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Post, PostSkeleton } from "./PostList";

const fakePost = {
  author: "u123",
  numComments: 123,
  name: "p_123",
  score: 456,
  thumbnail: undefined,
  title: "This is some post!",
  url: "http://reddit.com"
};

function Container(props) {
  return (
    <div width={400} height={300}>
      {props.children}
    </div>
  );
}

storiesOf("PostList", module)
  .add("default", () => (
    <Container>
      <Post onClick={action("clicked")} post={fakePost} />
      <Post onClick={action("clicked")} post={fakePost} />
      <Post onClick={action("clicked")} post={fakePost} />
    </Container>
  ))
  .add("skeleton", () => (
    <Container>
      <PostSkeleton index={1} titleWidth={100} descriptionWidth={250} />
      <PostSkeleton index={2} titleWidth={100} descriptionWidth={250} />
      <PostSkeleton index={3} titleWidth={100} descriptionWidth={250} />
    </Container>
  ));
