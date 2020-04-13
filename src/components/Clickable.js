import React from "react";
import classNames from "classnames";

import styles from "./Clickable.module.scss";

function Clickable(props) {
  const { focusOnlyOnTab, isDisabled, onClick } = props;

  const clsName = classNames(styles.Clickable, {
    [styles.ClickableDisabled]: isDisabled
  });
  return (
    <div>
      <button className={clsName} onClick={onClick} disabled={isDisabled}>
        {focusOnlyOnTab ? (
          <div tabIndex="-1">{React.Children.only(props.children)}</div>
        ) : (
          React.Children.only(props.children)
        )}
      </button>
    </div>
  );
}

export default Clickable;
