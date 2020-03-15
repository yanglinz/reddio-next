import React from "react";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import fetch from "isomorphic-fetch";

import store from "../store/store";

const graphqlUri = "http://localhost:3000/api/graphql";
const client = new ApolloClient({ uri: graphqlUri, fetch });

function AppWrapper(props) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </Provider>
  );
}

export default AppWrapper;
