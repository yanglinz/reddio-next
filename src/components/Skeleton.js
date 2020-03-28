import React from "react";
import { View } from "react-native-web";

import styles from "./Skeleton.module.scss";

function Skeleton(props) {
  const { width, height, borderRadius } = props;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: Number.isInteger(borderRadius) ? borderRadius : 2,
        overflow: "hidden"
      }}
    >
      <div className={styles.SkeletonInner} />
    </div>
  );
}

export default Skeleton;
