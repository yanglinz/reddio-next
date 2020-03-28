import React from "react";
import { storiesOf } from "@storybook/react";

import Thumbnail from "./Thumbnail";

storiesOf("Thumbnail", module).add("default", () => (
  <div style={{ width: 100 }}>
    <Thumbnail
      title="Example thumbnail"
      width={50}
      height={50}
      seed="some-seed"
      src="https://picsum.photos/id/42/200/300"
    />

    <Thumbnail
      title="Example thumbnail"
      width={50}
      height={50}
      seed="another-seed"
      src="http://bad-image.com/test.jpg"
    />
  </div>
));
