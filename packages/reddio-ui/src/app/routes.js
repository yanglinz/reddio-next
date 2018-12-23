import React from "react";
import { ActivityIndicator, View } from "react-native";
import { BrowserRouter as Router, Route } from "react-router-dom";

import DynamicImport from "../components/DynamicImport";

function Loading() {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

function LazyHome(props) {
  return (
    <DynamicImport load={() => import("../screens/Home")}>
      {Component =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

function AppRoutes() {
  return (
    <Router>
      <React.Fragment>
        <Route path="/" exact component={LazyHome} />
      </React.Fragment>
    </Router>
  );
}

export default AppRoutes;
