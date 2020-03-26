import React from "react";
import { View } from "react-native-web";

import styles from "./Layout.module.scss";

const layoutWidth = {
  small: 480,
  medium: 760,
  large: 980
};

export function FullWidth(props) {
  return (
    <div className={styles.FullWidth}>
      <View>{props.children}</View>
    </div>
  );
}

export function Wide(props) {
  return (
    <div className={styles.Wide}>
      <View>{props.children}</View>
    </div>
  );
}

export function Standard(props) {
  return (
    <div className={styles.Standard}>
      <View>{props.children}</View>
    </div>
  );
}
