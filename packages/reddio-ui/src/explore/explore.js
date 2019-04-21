import React from "react";
import { View } from "react-native";

import Summary from "./summary";
import * as data from "./data";

function Explore() {
  return (
    <View>
      <Summary title="Classical" listings={data.byGenre.classical} />
    </View>
  );
}

export default Explore;
