import React from "react";
import { storiesOf } from "@storybook/react";

import Thumbnail from "./Thumbnail";

storiesOf("Thumbnail", module)
  .add("default", () => (
    <Thumbnail
      title="Thumbnail"
      width={75}
      height={75}
      seed="some-seed"
      src="https://picsum.photos/id/42/200/300"
    />
  ))
  .add("fallback", () => (
    <Thumbnail
      title="Thumbnail"
      width={75}
      height={75}
      seed="another-seed"
      src="http://bad-image.com/test.jpg"
    />
  ))
  .add("large", () => (
    <Thumbnail
      title="Thumbnail"
      width={150}
      height={150}
      seed="another-seed"
      src="https://picsum.photos/id/42/200/300"
    />
  ))
  .add("large fallback", () => (
    <Thumbnail
      title="Thumbnail"
      width={150}
      height={150}
      seed="another-seed"
      src="http://bad-image.com/test.jpg"
    />
  ))
  .add("stacked", () => (
    <div style={{ width: 75 }}>
      <Thumbnail
        title="Thumbnail"
        width={75}
        height={75}
        seed="some-seed"
        src="https://picsum.photos/id/42/200/300"
      />
      <Thumbnail
        title="Example thumbnail"
        width={75}
        height={75}
        seed="another-seed"
        src="http://bad-image.com/test.jpg"
      />
    </div>
  ));
