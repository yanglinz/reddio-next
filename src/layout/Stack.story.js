import React from "react";

import Stack from "./Stack";
import Outline from "../storybook/Outline";
import Placeholder from "../storybook/Placeholder";

export const main = () => (
  <Outline>
    <Stack>
      <Placeholder width={200} />
      <Placeholder width={200} />
      <Placeholder width={200} />
    </Stack>
  </Outline>
);

export default { title: "Stack" };
