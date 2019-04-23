import React from "react";
import { View, StyleSheet } from "react-native";

import Summary from "./summary";
import useMediaQuery from "../lib/media-query-hook";
import * as data from "./data";
import * as design from "../design";

function Explore() {
  const mq = useMediaQuery();
  return (
    <View style={styles.explore}>
      <View
        style={
          mq.medium ? [styles.exploreBg, styles.exploreBgMed] : styles.exploreBg
        }
      >
        <Summary title="Electronic" listings={data.byGenre.electronic} />
        <Summary title="Rock / Alternative" listings={data.byGenre.rock} />
        <Summary title="Hip-Hop" listings={data.byGenre.hiphop} />
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
  exploreBg: {
    backgroundColor: "#fff",
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base
  },
  exploreBgMed: {
    width: design.layoutWidth.medium - design.spacing.large * 2,
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base
  }
});

export default Explore;
