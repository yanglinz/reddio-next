import React from "react";
import classNames from "classnames";

import styles from "./Clickable.module.css";

function Clickable(props) {
  const { focusOnlyOnTab, isDisabled, onClick } = props;

  const clsName = classNames(styles.clickable, {
    [styles.clickableDisabled]: isDisabled
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
