import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withRouter } from "react-router-dom";

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
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderBottomWidth: 1,
    padding: design.spacing.base
  },
  branding: {
    flexDirection: "row",
    alignItems: "center"
  },
  siteName: {
    color: "#388e3c",
    fontSize: design.fontSize.larger2
  },
  siteNameAccent: {
    color: "#999",
    fontSize: design.fontSize.larger2
  }
});

export default withRouter(Header);
