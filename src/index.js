import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

import AppRoutes from "./screens/Routes";
import AppPlayer from "./screens/Player/Player";
import store from "./store/store";

import "./index.css";

let graphqlUri = "/graphql/";
try {
  const isLocal = document.location.host.includes("localhost");
  if (isLocal) {
    graphqlUri = "http://localhost:4000/graphql/";
  }
} catch (e) {
  // Do nothing
}

const client = new ApolloClient({ uri: graphqlUri });

function Application() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppPlayer />
        <AppRoutes />
      </ApolloProvider>
    </Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
