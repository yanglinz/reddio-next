import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

import AppRoutes from "./app/AppRoutes";
import store from "./store";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

function Application() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
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
