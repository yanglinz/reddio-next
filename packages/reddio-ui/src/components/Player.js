import React from "react";
import { View, Button, StyleSheet } from "react-native";

function Player() {
  return (
    <View style={styles.player}>
      <View style={styles.controls}>
        <View style={styles.controlButton}>
          <Button onPress={() => console.log("play")} title="Play" />
        </View>

        <View style={styles.controlButton}>
          <Button onPress={() => console.log("pause")} title="Pause" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    display: "flex",
    alignItems: "center",
    borderColor: "#ddd",
    borderTopWidth: 1,
    padding: 16
  },
  controls: {
    flexDirection: "row"
  },
  controlButton: {
    marginLeft: 5,
    marginRight: 5
  }
});

export default Player;
