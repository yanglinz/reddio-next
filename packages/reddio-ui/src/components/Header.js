import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import IconMusicalNote from "../assets/IconMusicalNote";

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.branding}>
        <View style={styles.siteIcon}>
          <IconMusicalNote size={12} color="#388e3c" />
        </View>
        <Text style={styles.siteName}>Reddio</Text>
        <Text style={styles.siteNameAccent}> Player</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderColor: "#DDD",
    borderBottomWidth: 1,
    paddingTop: 2,
    paddingBottom: 2
  },
  branding: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  siteIcon: {
    marginTop: 2,
    marginRight: 12
  },
  siteName: {
    color: "#388e3c",
    fontSize: 24
  },
  siteNameAccent: {
    color: "#999",
    fontSize: 24
  }
});

export default Header;
