import React, { Suspense, lazy } from "react";
import { View, StyleSheet } from "react-native";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./brand/header";
import Loading from "./lib/loading";

const Home = lazy(() => import("./explorer/home"));
const ListingResolver = lazy(() => import("./listing/listing"));

function Screen(props) {
  return (
    <View style={styles.screen}>
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

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 75
  }
});

export default AppRoutes;
