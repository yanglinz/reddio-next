import React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import * as design from "../design";

function ServiceError() {
  return (
    <View style={styles.error}>
      <Text style={styles.icon}>:(</Text>
      <Text style={styles.title}>Oops, something went wrong.</Text>
      <Text style={styles.subtitle}>
        Looks like we couldn't load your content
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    paddingTop: design.spacing.base,
    paddingBottom: design.spacing.large
  },
  icon: {
    color: design.colors.primary.c6,
    fontSize: 240,
    textAlign: "center"
  },
  title: {
    color: design.colors.neutral.c4,
    fontSize: design.fontSize.large,
    marginTop: design.spacing.large,
    textAlign: "center"
  },
  subtitle: {
    color: design.colors.neutral.c7,
    fontSize: design.fontSize.large,
    marginTop: design.spacing.small,
    textAlign: "center"
  }
});

export default ServiceError;
