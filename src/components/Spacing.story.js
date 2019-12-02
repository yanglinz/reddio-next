import React from "react";
import { storiesOf } from "@storybook/react";

import { Inline, Stack } from "./Spacing";
import * as design from "../design";

function Container(props) {
  return (
    <div style={{ backgroundColor: design.colors.primary.c8 }}>
      {props.children}
    </div>
  );
}

function Box(props) {
  return (
    <div
      style={{
        width: 75,
        height: 75,
        backgroundColor: design.colors.primary.c4
      }}
    >
      {props.children}
    </div>
  );
}

storiesOf("Spacing", module)
  .add("inline single", () => (
    <Container>
      <Inline>
        <Box />
      </Inline>
    </Container>
  ))
  .add("inline double", () => (
    <Container>
      <Inline>
        <Box />
        <Box />
      </Inline>
    </Container>
  ))
  .add("inline multiple", () => (
    <Container>
      <Inline>
        <Box />
        <Box />
        <Box />
      </Inline>
    </Container>
  ))
  .add("stack single", () => (
    <Container>
      <Stack>
        <Box />
      </Stack>
    </Container>
  ))
  .add("stack double", () => (
    <Container>
      <Stack>
        <Box />
        <Box />
      </Stack>
    </Container>
  ))
  .add("stack multiple", () => (
    <Container>
      <Stack>
        <Box />
        <Box />
        <Box />
      </Stack>
    </Container>
  ));
