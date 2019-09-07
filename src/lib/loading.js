import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import * as design from "../design";

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={design.colors.primary.c4} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: design.spacing.large,
    marginBottom: design.spacing.large
  }
});

export default Loading;
