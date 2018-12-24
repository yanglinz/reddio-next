import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import IconMusicalNote from "../assets/IconMusicalNote";

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.branding}>
        <View style={styles.siteIcon}>
          <IconMusicalNote size={12} color="#FF6F00" />
        </View>
        <Text style={styles.siteName}>Reddio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderColor: "#ddd",
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 16
  },
  branding: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  siteIcon: {
    marginTop: 4,
    marginRight: 8
  },
  siteName: {
    color: "#FF6F00",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Header;
