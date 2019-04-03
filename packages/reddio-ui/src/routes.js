import React from "react";
import { ActivityIndicator, View } from "react-native";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./brand/header";
import DynamicImport from "./lib/dynamic-import";

function Loading() {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

function LazyHome(props) {
  return (
    <DynamicImport load={() => import("./explorer/home")}>
      {Component =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

function LazyListingResolver(props) {
  return (
    <DynamicImport load={() => import("./listing/listing")}>
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
          <Switch>
            <Route path="/" exact component={LazyHome} />
            <Route component={LazyListingResolver} />
          </Switch>
        </Screen>
      </React.Fragment>
    </Router>
  );
}

export default AppRoutes;
