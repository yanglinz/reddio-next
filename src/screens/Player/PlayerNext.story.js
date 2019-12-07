import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import PlayerNext, { Status } from "./PlayerNext";

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

const noop = () => {};

storiesOf("PlayerNext", module)
  .add("default", () => (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <StateProvider>
        {({ status, onClick }) => (
          <PlayerNext
            status={status}
            onClickPlayPause={onClick}
            onClickPrev={noop}
            onClickNext={noop}
          />
        )}
      </StateProvider>
    </div>
  ))
  .add("disabled", () => (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <PlayerNext
        status={Status.DISABLED}
        onClickPlayPause={noop}
        onClickPrev={noop}
        onClickNext={noop}
      />
    </div>
  ));
