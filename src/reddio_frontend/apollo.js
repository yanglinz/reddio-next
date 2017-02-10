import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://graphql.org/swapi-graphql/'
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
