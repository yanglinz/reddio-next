import React from "react";
import { ActivityIndicator, View } from "react-native";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/Header";
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

function LazyListingResolver(props) {
  return (
    <DynamicImport load={() => import("../screens/ListingResolver")}>
      {Component =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

function Screen(props) {
  return (
    <View>
      <Header>{props.children}</Header>
      {props.children}
    </View>
  );
}

function AppRoutes() {
  return (
    <Router>
      <React.Fragment>
        <Screen>
          <Route path="/" component={LazyHome} />
          <Route component={LazyListingResolver} />
        </Screen>
      </React.Fragment>
    </Router>
  );
}

export default AppRoutes;
