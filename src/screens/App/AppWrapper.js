import React from "react";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import fetch from "isomorphic-fetch";

import store from "../../store/store";

import styles from "./AppWrapper.module.scss";

const graphqlUri = "/api/graphql";
const client = new ApolloClient({ uri: graphqlUri, fetch });

function AppWrapper(props) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div className={styles.AppWrapper}>{props.children}</div>
      </ApolloProvider>
    </Provider>
  );
}

export default AppWrapper;
