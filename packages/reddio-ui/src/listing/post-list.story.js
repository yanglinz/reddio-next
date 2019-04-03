import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Post } from "./post-list";

const fakePost = {
  author: "u123",
  numComments: 123,
  score: 456,
  thumbnail: undefined,
  title: "This is some post!",
  url: "http://reddit.com"
};

storiesOf("PostList", module).add("post", () => (
  <Post onClick={action("clicked")} post={fakePost} />
));
