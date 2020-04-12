import React from "react";
import { storiesOf } from "@storybook/react";

import Thumbnail from "./Thumbnail";

const realThumbnail =
  "https://a.thumbs.redditmedia.com/BGVFcvB9jzPE3z5QYAf3wuuj5RAdFp10uJtZ_-M-UW0.jpg";
const genericThumbnail = "https://picsum.photos/id/42/200/300";
const invalidThumbnail = "http://bad-image.com/test.jpg";

storiesOf("Thumbnail", module)
  .add("default", () => (
    <Thumbnail width={75} height={75} seed="1" src={realThumbnail} />
  ))
  .add("generic", () => (
    <Thumbnail width={75} height={75} seed="1" src={genericThumbnail} />
  ))
  .add("fallback", () => (
    <Thumbnail width={75} height={75} seed="1" src={invalidThumbnail} />
  ))
  .add("large", () => (
    <Thumbnail width={150} height={150} seed="1" src={realThumbnail} />
  ))
  .add("large generic", () => (
    <Thumbnail width={150} height={150} seed="1" src={genericThumbnail} />
  ))
  .add("large fallback", () => (
    <Thumbnail width={150} height={150} seed="1" src={invalidThumbnail} />
  ))
  .add("stacked", () => (
    <div style={{ width: 75 }}>
      <Thumbnail width={75} height={75} seed="1" src={genericThumbnail} />
      <Thumbnail width={75} height={75} seed="1" src={invalidThumbnail} />
    </div>
  ));
