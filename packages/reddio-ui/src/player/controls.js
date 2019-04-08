import React from "react";
import { View, Button, StyleSheet } from "react-native";

function PlayerControls(props) {
  const { status, handlePlay, handlePause } = props;
  return (
    <View style={styles.player}>
      <View style={styles.controls}>
        <View style={styles.controlButton}>
          <Button
            onPress={handlePlay}
            title="Play"
            disabled={status === "PLAYING"}
          />
        </View>

        <View style={styles.controlButton}>
          <Button
            onPress={handlePause}
            title="Pause"
            disabled={status === "PAUSED"}
          />
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

export default PlayerControls;
