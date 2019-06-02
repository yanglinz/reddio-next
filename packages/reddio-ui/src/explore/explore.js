import React from "react";
import { View, StyleSheet } from "react-native";

import Summary from "./summary";
import * as Layout from "../layout";
import * as data from "./data";
import * as design from "../design";

function Explore() {
  const mq = Layout.useMediaQuery();
  return (
    <View style={styles.explore}>
      <Layout.Standard>
        <View
          style={
            mq.medium
              ? [styles.exploreBg, styles.exploreBgMed]
              : styles.exploreBg
          }
        >
          <Summary title="Electronic" listings={data.byGenre.electronic} />
          <Summary title="Rock / Alternative" listings={data.byGenre.rock} />
          <Summary title="Hip-Hop" listings={data.byGenre.hiphop} />
          <Summary title="Classical" listings={data.byGenre.classical} />
        </View>
      </Layout.Standard>
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
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base
  }
});

export default Explore;
