import React, { Suspense, lazy } from "react";
import { ActivityIndicator, View } from "react-native";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./brand/header";

function Loading() {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const Home = lazy(() => import("./explorer/home"));
const ListingResolver = lazy(() => import("./listing/listing"));

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
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route component={ListingResolver} />
            </Switch>
          </Suspense>
        </Screen>
      </React.Fragment>
    </Router>
  );
}

export default AppRoutes;
