import React from "react";
import { View, Text } from "react-native";

import ListingProvider from "../app/ListingProvider";

class App extends React.Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <ListingProvider pathname="/" />
      </View>
    );
  }
}

export default App;
