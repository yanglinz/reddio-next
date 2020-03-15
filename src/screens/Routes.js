import React, { Suspense, lazy, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native-web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Loading from "../components/Loading";

const Home = lazy(() => import("./Home/Home"));
const Explore = lazy(() => import("./Explore/Explore"));
const ListingResolver = lazy(() => import("./Listing/Listing"));

function Screen(props) {
  return (
    <View style={styles.screen}>
      <Header>{props.children}</Header>
      {props.children}
    </View>
  );
}

function DelayedLoading() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => setDone(true), 1500);
    return () => timeout && clearTimeout(timeout);
  }, []);

  if (done) {
    return <Loading />;
  }

  return null;
}

function AppRoutes() {
  return (
    <Router>
      <React.Fragment>
        <Screen>
          <Suspense fallback={<DelayedLoading />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/explore" exact component={Explore} />
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
    paddingBottom: 65
  }
});

export default AppRoutes;
