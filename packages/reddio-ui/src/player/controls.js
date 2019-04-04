import React from "react";
import { View, Button, StyleSheet } from "react-native";
import noop from "lodash/noop";

function PlayerControls(props) {
  const { status } = props;
  return (
    <View style={styles.player}>
      <View style={styles.controls}>
        <View style={styles.controlButton}>
          <Button onPress={noop} title="Play" disabled={status === "PLAYING"} />
        </View>

        <View style={styles.controlButton}>
          <Button onPress={noop} title="Pause" disabled={status === "PAUSED"} />
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
