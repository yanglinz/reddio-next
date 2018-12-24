import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Post } from "./PostList";

storiesOf("PostList", module).add("post", () => (
  <Post onClick={action("clicked")} />
));
