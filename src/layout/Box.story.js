import React from "react";

import Box from "./Box";
import Outline from "../storybook/Outline";

export const main = () => (
  <Outline>
    <Box padding={8}>Hello Box!</Box>
  </Outline>
);

export const larger = () => (
  <Outline>
    <Box padding={32}>Hello Box!</Box>
  </Outline>
);

export const responsive = () => (
  <Outline>
    <Box padding={(8, 16, 32)}>Hello Box!</Box>
  </Outline>
);

export default { title: "Box" };
