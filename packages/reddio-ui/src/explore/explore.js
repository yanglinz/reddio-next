import React from "react";
import { View, StyleSheet } from "react-native";

import Summary from "./summary";
import * as data from "./data";
import * as design from "../design";

function Explore() {
  return (
    <View style={styles.explore}>
      <View style={styles.exploreBackground}>
        <Summary title="Classical" listings={data.byGenre.classical} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  explore: {
    justifyContent: "center",
    alignItems: "center"
  },
  exploreBackground: {
    backgroundColor: "#fff",
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base,
    width: 550
  }
});

export default Explore;
