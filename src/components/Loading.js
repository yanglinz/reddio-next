import React from "react";
import { ActivityIndicator } from "react-native-web";

import * as design from "../design";

function Loading() {
  return <ActivityIndicator size="large" color={design.colors.primary.c4} />;
}

export default Loading;
