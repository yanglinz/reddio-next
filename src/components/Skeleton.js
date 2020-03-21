import React from "react";
import { View } from "react-native-web";

import styles from "./Skeleton.module.css";

function Skeleton(props) {
  const { width, height, borderRadius } = props;
  return (
    <View
      style={{
        width,
        height,
        borderRadius: Number.isInteger(borderRadius) ? borderRadius : 2,
        overflow: "hidden"
      }}
    >
      <div className={styles.SkeletonInner} />
    </View>
  );
}

export default Skeleton;
