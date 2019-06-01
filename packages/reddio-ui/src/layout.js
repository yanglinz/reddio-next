import React from "react";
import { View } from "react-native";

import "./layout.css";

// TODO: move media-query-hook into layout.js
// TODO: remove layout constants from design.js

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
