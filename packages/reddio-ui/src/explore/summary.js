import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withRouter } from "react-router-dom";

import * as design from "../design";

function Summary(props) {
  const { title, listings, history } = props;

  return (
    <View style={styles.summary}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {listings.map(listing => (
        <View key={listing} style={styles.listing}>
          <Text onPress={() => history.push(listing)}>{listing}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginBottom: design.spacing.large,
    borderColor: "#ddd",
    borderBottomWidth: 1
  },
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

export default withRouter(Summary);
