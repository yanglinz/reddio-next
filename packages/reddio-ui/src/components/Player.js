import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Player() {
  return (
    <View style={styles.player}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    borderColor: "#ddd",
    borderTopWidth: 1,
    padding: 16
  }
});

export default Player;
