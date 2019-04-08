import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ListingSummary(props) {
  const { pathname } = props;
  return (
    <View style={styles.summary}>
      <Text>{pathname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default ListingSummary;
