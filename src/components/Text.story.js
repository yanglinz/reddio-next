import React from "react";
import { storiesOf } from "@storybook/react";

import { Heading1, Heading2, Heading3, Heading4 } from "./Text";

storiesOf("Text", module)
  .add("headings", () => (
    <div>
      <Heading1 size="xxl">Hello world!</Heading1>
      <Heading1 size="xxl">Hello world!</Heading1>
      <Heading1 size="xxl">Hello world!</Heading1>
      <Heading1 size="xxl">Hello world!</Heading1>
    </div>
  ))
  .add("headings mixture", () => (
    <div>
      <Heading2 size="l">Hello world!</Heading2>
      <Heading1 size="m">Hello world!</Heading1>
      <Heading3 size="xxl">Hello world!</Heading3>
      <Heading4 size="xs">Hello world!</Heading4>
    </div>
  ));
