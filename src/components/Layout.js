import React from "react";

import styles from "./Layout.module.scss";

export function FullWidth(props) {
  return (
    <div className={styles.FullWidth}>
      <div>{props.children}</div>
    </div>
  );
}

export function Wide(props) {
  return (
    <div className={styles.Wide}>
      <div>{props.children}</div>
    </div>
  );
}

export function Standard(props) {
  return (
    <div className={styles.Standard}>
      <div>{props.children}</div>
    </div>
  );
}
