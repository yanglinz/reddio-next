import React from "react";
import { motion } from "framer-motion";

import { Inline } from "../../vendor/ui-system";
import PlayPause from "./PlayPause";
import IconSkipNext from "../../assets/IconSkipNext";
import IconSkipPrev from "../../assets/IconSkipPrev";
import Thumbnail from "../../components/Thumbnail";
import Clickable from "../../components/Clickable";
import * as enums from "../../store/enums";
import * as design from "../../styles/design";

import styles from "./PlayerNext.module.scss";

function InteractiveIcon(props) {
  const { status, onClick, children } = props;

  const isDisabled = status === enums.PlaybackStatus.INITIALIZED;
  const color = isDisabled ? design.colors.neutral.c9 : undefined;
  const icon = React.cloneElement(children, { color });
  return (
    <Clickable onClick={onClick} focusOnlyOnTab isDisabled={isDisabled}>
      {isDisabled ? (
        icon
      ) : (
        <motion.div
          whileTap={{ opacity: 0.2 }}
          transition={{
            duration: 0.3
          }}
        >
          {icon}
        </motion.div>
      )}
    </Clickable>
  );
}

function PlayerNext(props) {
  const {
    activePost,
    status,
    onClickPlayPause,
    onClickPrev,
    onClickNext
  } = props;

  return (
    <div className={styles.Player}>
      <div className={styles.ActiveInfo}>
        {activePost ? (
          <Thumbnail
            width={60}
            height={60}
            src={activePost.thumbnail}
            seed={activePost.name}
          />
        ) : null}
      </div>

      <div className={styles.Control}>
        <Inline spacing={design.space.l} vcentered>
          <InteractiveIcon status={status} onClick={onClickPrev}>
            <IconSkipPrev size={22} />
          </InteractiveIcon>

          <PlayPause status={status} onClick={onClickPlayPause} />

          <InteractiveIcon status={status} onClick={onClickNext}>
            <IconSkipNext size={22} />
          </InteractiveIcon>
        </Inline>
      </div>

      <div className={styles.Extra}></div>
    </div>
  );
}

export default PlayerNext;
