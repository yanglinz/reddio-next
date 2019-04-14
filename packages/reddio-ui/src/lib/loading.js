import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import * as design from "../design";

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: design.spacing.large
  }
});

export default Loading;
