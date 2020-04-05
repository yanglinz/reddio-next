import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import PlayPause from "./PlayPause";
import * as enums from "../../store/enums";

const statusTransition = {
  [enums.PlaybackStatus.PAUSED]: enums.PlaybackStatus.PLAYING,
  [enums.PlaybackStatus.PLAYING]: enums.PlaybackStatus.PAUSED
};

function StateProvider(props) {
  const [status, setStatus] = useState(enums.PlaybackStatus.PAUSED);
  return props.children({
    status,
    onClick: () => setStatus(statusTransition[status])
  });
}

storiesOf("PlayPause", module)
  .add("default", () => (
    <StateProvider>
      {({ status, onClick }) => <PlayPause status={status} onClick={onClick} />}
    </StateProvider>
  ))
  .add("disabled", () => (
    <PlayPause status={enums.PlaybackStatus.INITIALIZED} onClick={() => {}} />
  ));
