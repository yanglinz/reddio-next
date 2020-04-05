import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PlayerNext from "./PlayerNext";
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

storiesOf("PlayerNext", module)
  .add("default", () => (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <StateProvider>
        {({ status, onClick }) => (
          <PlayerNext
            status={status}
            onClickPlayPause={onClick}
            onClickPrev={action("Previous")}
            onClickNext={action("Next")}
          />
        )}
      </StateProvider>
    </div>
  ))
  .add("disabled", () => (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <PlayerNext
        status={enums.PlaybackStatus.INITIALIZED}
        onClickPlayPause={action("Play/Pause")}
        onClickPrev={action("Previous")}
        onClickNext={action("Previous")}
      />
    </div>
  ));
