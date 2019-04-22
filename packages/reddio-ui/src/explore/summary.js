import React from "react";
import { View, Text, StyleSheet } from "react-native";

import * as design from "../design";

function Summary(props) {
  const { title, listings } = props;

  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {listings.map(listing => (
        <View key={listing} style={styles.listing}>
          <Text>{listing}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: design.spacing.base,
    paddingBottom: design.spacing.base,
    paddingLeft: design.spacing.small,
    paddingRight: design.spacing.small
  },
  titleText: {
    fontSize: design.fontSize.small,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  listing: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderTopWidth: 1,
    padding: design.spacing.small
  }
});

export default Summary;
