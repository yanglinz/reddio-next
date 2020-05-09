import React from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

function Button(props) {
  const { color, focusOnlyOnTab, isDisabled, onClick } = props;

  const clsName = classNames(styles.Button, {
    [styles.ButtonDisabled]: isDisabled
  });
  const buttonInner = props.children;
  return (
    <div>
      <button className={clsName} onClick={onClick} disabled={isDisabled}>
        {focusOnlyOnTab ? <div tabIndex="-1">{buttonInner}</div> : buttonInner}
      </button>
    </div>
  );
}

export default Button;
