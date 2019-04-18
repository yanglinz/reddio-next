import React from "react";
import { View, Text } from "react-native";

function Summary(props) {
  const { title, listings } = props;

  return (
    <View>
      <Text>{title}</Text>
      {listings.map(listing => (
        <View key={listing}>
          <Text>{listing}</Text>
        </View>
      ))}
    </View>
  );
}

export default Summary;
