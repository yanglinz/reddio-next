import React from "react";

import Inline from "./Inline";
import Outline from "../storybook/Outline";
import Placeholder from "../storybook/Placeholder";

export const main = () => (
  <Outline>
    <Inline>
      <Placeholder width={200} />
      <Placeholder width={200} />
      <Placeholder width={200} />
    </Inline>
  </Outline>
);

export default { title: "Inline" };
