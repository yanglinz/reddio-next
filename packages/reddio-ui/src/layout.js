import React from "react";
import { View } from "react-native";

import "./layout.css";

export function FullWidth(props) {
  return (
    <div className="FullWidth">
      <View>{props.children}</View>
    </div>
  );
}

export function Wide(props) {
  return (
    <div className="Wide">
      <View>{props.children}</View>
    </div>
  );
}

export function Standard(props) {
  return (
    <div className="Standard">
      <View>{props.children}</View>
    </div>
  );
}
