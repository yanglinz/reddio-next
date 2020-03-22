import React from "react";

import styles from "./Placeholder.module.css";

function Placeholder(props) {
  const width = props.width || "100%";
  const height = props.height || 60;
  const text = props.text || "Placeholder";
  return (
    <div className={styles.Placeholder} style={{ width, height }}>
      {text}
    </div>
  );
}

export default Placeholder;
