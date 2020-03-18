import React from "react";
import classNames from "classnames";

import styles from "./Clickable.module.css";

function Clickable(props) {
  const { onClick, focusOnlyOnTab, isDisabled } = props;

  // TODO: Fix conditional styles
  const clsName = classNames(styles.Clickable, {
    "Clickable-focusOnlyOnTab": focusOnlyOnTab,
    "Clickable-isDisabled": isDisabled
  });
  return (
    <button className={clsName} onClick={onClick} disabled={isDisabled}>
      {focusOnlyOnTab ? (
        <div tabIndex="-1">{React.Children.only(props.children)}</div>
      ) : (
        React.Children.only(props.children)
      )}
    </button>
  );
}

export default Clickable;
