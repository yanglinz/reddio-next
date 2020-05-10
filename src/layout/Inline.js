import React from "react";

import styles from "./Inline.module.css";

export function Inline(props) {
  const spacing = props.spacing || 8;
  const vcentered = props.vcentered;

  let clsName = [styles.Inline, vcentered ? styles.InlineVcentered : undefined];
  clsName = clsName.filter(Boolean);
  clsName = clsName.join(" ");

  return (
    <div className={clsName}>
      {React.Children.map(props.children, (c, i) => (
        <div style={{ display: "flex", marginLeft: i > 0 ? spacing : 0 }}>
          {c}
        </div>
      ))}
    </div>
  );
}

export default Inline;
