import React from "react";
import { View, Text } from "react-native";

function ListingSummary(props) {
  const { pathname } = props;
  return (
    <View>
      <Text>{pathname}</Text>
    </View>
  );
}

export default ListingSummary;
