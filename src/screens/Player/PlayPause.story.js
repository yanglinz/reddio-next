import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import PlayPause, { Status } from "./PlayPause";

const statusTransition = {
  [Status.PAUSED]: Status.PLAYING,
  [Status.PLAYING]: Status.PAUSED
};

function StateProvider(props) {
  const [status, setStatus] = useState(Status.PAUSED);
  return props.children({
    status,
    onClick: () => setStatus(statusTransition[status])
  });
}

storiesOf("PlayPause", module).add("default", () => (
  <StateProvider>
    {({ status, onClick }) => <PlayPause status={status} onClick={onClick} />}
  </StateProvider>
));
