import React from "react";
import { StyleSheet, View } from "react-native-web";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
  }
});

export function centeredDecorator(renderStory) {
  return <View style={styles.root}>{renderStory()}</View>;
}
