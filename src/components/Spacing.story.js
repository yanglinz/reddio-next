import React from "react";
import { storiesOf } from "@storybook/react";

import { Box, Inline, Stack } from "./Spacing";
import Placeholder from "./Placeholder";
import * as design from "../design";

function Container(props) {
  return (
    <div style={{ backgroundColor: design.colors.neutral.c9 }}>
      {props.children}
    </div>
  );
}

storiesOf("Spacing", module)
  .add("box default", () => (
    <Container>
      <Box>
        <Placeholder width={120} height={60} />
      </Box>
    </Container>
  ))
  .add("box large", () => (
    <Container>
      <Box spacing="l">
        <Placeholder width={120} height={60} />
      </Box>
    </Container>
  ))
  .add("inline single", () => (
    <Container>
      <Inline>
        <Placeholder width={120} height={60} />
      </Inline>
    </Container>
  ))
  .add("inline double", () => (
    <Container>
      <Inline>
        <Placeholder width={120} height={60} />
        <Placeholder width={120} height={60} />
      </Inline>
    </Container>
  ))
  .add("inline multiple", () => (
    <Container>
      <Inline>
        <Placeholder width={120} height={60} />
        <Placeholder width={120} height={60} />
        <Placeholder width={120} height={60} />
      </Inline>
    </Container>
  ))
  .add("stack single", () => (
    <Container>
      <Stack>
        <Placeholder width={120} height={60} />
      </Stack>
    </Container>
  ))
  .add("stack double", () => (
    <Container>
      <Stack>
        <Placeholder width={120} height={60} />
        <Placeholder width={120} height={60} />
      </Stack>
    </Container>
  ))
  .add("stack multiple", () => (
    <Container>
      <Stack>
        <Placeholder width={120} height={60} />
        <Placeholder width={120} height={60} />
        <Placeholder width={120} height={60} />
      </Stack>
    </Container>
  ));
