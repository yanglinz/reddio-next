import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import settings from '../settings';

const graphQLUrl = settings.IS_PROD
  ? `${settings.PROTOCOL}://${settings.HOST}/graphql/`
  : `${settings.PROTOCOL}://${settings.HOST}:${settings.PORT}/graphql/`;

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: graphQLUrl })
});

function RootProvider(props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}

export default RootProvider;
