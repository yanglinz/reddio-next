import React from "react";
import { View, Text } from "react-native";

import Dataloader from "../components/Dataloader";

class App extends React.Component {
  render() {
    return (
      <Dataloader>
        {({ status, data }) =>
          console.log(data) || (
            <View>
              <Text>Home Screen</Text>
            </View>
          )
        }
      </Dataloader>
    );
  }
}

export default App;
