import React from "react";
import { View } from "react-native-web";

import "./Skeleton.module.css";

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
      <div className="rdtcl-skeleton" />
    </View>
  );
}

export default Skeleton;
