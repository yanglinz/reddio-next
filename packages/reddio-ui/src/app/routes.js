import React from "react";
import { ActivityIndicator, View } from "react-native";
import { BrowserRouter as Router, Route } from "react-router-dom";

class DynamicImport extends React.Component {
  state = {
    component: null
  };

  componentDidMount() {
    this.props.load().then(component => {
      this.setState(() => ({
        component: component.default ? component.default : component
      }));
    });
  }

  render() {
    return this.props.children(this.state.component);
  }
}

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
