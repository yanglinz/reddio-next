import React from "react";
import { storiesOf } from "@storybook/react";

import Skeleton from "./Skeleton";

storiesOf("Skeleton", module).add("default", () => (
  <Skeleton width={300} height={40} />
));
