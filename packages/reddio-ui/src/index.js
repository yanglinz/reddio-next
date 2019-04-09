import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

import AppRoutes from "./routes";
import AppPlayer from "./player/player";
import store from "./store";

import "./index.css";

let graphqlUri = "https://graphql-server.yanglin.now.sh/graphql";
try {
  const isLocal = document.location.host.includes("localhost");
  if (isLocal) {
    graphqlUri = "http://localhost:4000/graphql";
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// import * as serviceWorker from "./serviceWorker";
// serviceWorker.unregister();
