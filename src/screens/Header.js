import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native-web";

import * as design from "../design";

export function Header(props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.branding}
        onPress={() => props.history.push("/")}
      >
        <Text style={styles.siteName}>Reddio</Text>
        <Text style={styles.siteNameAccent}> Player</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fefefe",
    borderColor: design.colors.neutral.c9,
    borderBottomWidth: 1,
    padding: design.spacing.base
  },
  branding: {
    flexDirection: "row",
    alignItems: "center"
  },
  siteName: {
    color: design.colors.primary.c4,
    fontSize: design.fontSize.larger2
  },
  siteNameAccent: {
    color: design.colors.neutral.c5,
    fontSize: design.fontSize.larger2
  }
});

export default Header;
