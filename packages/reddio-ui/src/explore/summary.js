import React from "react";
import { View, Text, StyleSheet } from "react-native";

import * as design from "../design";

function Summary(props) {
  const { title, listings } = props;

  return (
    <View style={styles.summary}>
      <Text style={styles.title}>{title}</Text>
      {listings.map(listing => (
        <View key={listing} style={styles.listing}>
          <Text>{listing}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: design.spacing.base
  },
  title: {
    fontSize: design.spacing.base,
    fontWeight: 900
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
