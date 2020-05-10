import React from "react";

import styles from "./Outline.module.css";

function Outline(props) {
  return <div className={styles.Outline}>{props.children}</div>;
}

export default Outline;
