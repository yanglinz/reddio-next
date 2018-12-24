import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LISTING_QUERY = gql`
  query ListingQuery($pathname: String!) {
    listing(pathname: $pathname) {
      posts {
        author
        name
        numComments
        score
        thumbnail
        title
        url
      }
    }
  }
`;

function ListingLoading() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}

function ListingError() {
  return (
    <View>
      <Text>:(</Text>
    </View>
  );
}

class ListingProvider extends React.Component {
  render() {
    const { pathname } = this.props;
    const variables = { pathname };
    return (
      <Query query={LISTING_QUERY} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ListingLoading />;
          }

          if (error) {
            return <ListingError />;
          }

          return this.props.children({ data });
        }}
      </Query>
    );
  }
}

export default ListingProvider;
