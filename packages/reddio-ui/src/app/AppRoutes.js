import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../brand/Header";
import DynamicImport from "../components/DynamicImport";
import * as appStore from "../app/AppStore";

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

function AppRoutes(props) {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(appStore.initialize());
  });

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

export default connect()(AppRoutes);
