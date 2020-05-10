import React from "react";

import styles from "./Stack.module.css";

export function Stack(props) {
  const spacing = props.spacing || 8;
  return (
    <div className={styles.Stack}>
      {React.Children.map(props.children, (c, i) => (
        <div style={{ marginTop: i > 0 ? spacing : 0 }}>{c}</div>
      ))}
    </div>
  );
}

export default Stack;
