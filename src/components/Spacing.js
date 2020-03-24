import React from "react";

import styles from "./Spacing.module.scss";

export const Spacing = {
  XXS: 4,
  XS: 6,
  S: 10,
  M: 16,
  L: 26,
  XL: 42,
  XXL: 67
};

export function Box(props) {
  return <div className={styles.Box}>{props.children}</div>;
}

export function Inline(props) {
  const spacing = props.spacing || Spacing.M;
  return (
    <div className={styles.Inline}>
      {React.Children.map(props.children, (c, i) => (
        <div style={{ display: "flex", marginLeft: i > 0 ? spacing : 0 }}>
          {c}
        </div>
      ))}
    </div>
  );
}

export function Stack(props) {
  const spacing = props.spacing || Spacing.M;
  return (
    <div className={styles.Stack}>
      {React.Children.map(props.children, (c, i) => (
        <div style={{ marginTop: i > 0 ? spacing : 0 }}>{c}</div>
      ))}
    </div>
  );
}
