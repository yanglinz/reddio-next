import React from "react";
import { storiesOf } from "@storybook/react";

import { Heading1, Heading2, Heading3, Heading4, Heading5 } from "./Text";

storiesOf("Text", module)
  .add("headings", () => (
    <div>
      <Heading1 size="xxxl">Hello world!</Heading1>
      <Heading1 size="xxxl">Hello world!</Heading1>
      <Heading1 size="xxxl">Hello world!</Heading1>
      <Heading1 size="xxxl">Hello world!</Heading1>
      <Heading1 size="xxxl">Hello world!</Heading1>
    </div>
  ))
  .add("headings mixture", () => (
    <div>
      <Heading1 size="m">Hello world!</Heading1>
      <Heading2 size="l">Hello world!</Heading2>
      <Heading3 size="xl">Hello world!</Heading3>
      <Heading4 size="xxl">Hello world!</Heading4>
      <Heading5 size="xxxl">Hello world!</Heading5>
    </div>
  ));
