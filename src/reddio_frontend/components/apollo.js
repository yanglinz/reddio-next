import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";

import settings from "../settings";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: settings.FRONTEND_GRAPHQL_URI
  })
});

function RootProvider(props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}

export default RootProvider;
