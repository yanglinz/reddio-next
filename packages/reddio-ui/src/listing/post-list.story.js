import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Post, PostSkeleton } from "./post-list";

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
    <View width={400} height={300}>
      {props.children}
    </View>
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
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </Container>
  ));
