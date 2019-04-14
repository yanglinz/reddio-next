import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import last from "lodash/last";
import uniqBy from "lodash/uniqBy";

import Loading from "../lib/loading";

const LISTING_QUERY = gql`
  query ListingQuery($pathname: String!, $after: String) {
    listing(pathname: $pathname) {
      posts(after: $after) {
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
      <Loading />
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

function combineQueries(data, moreData) {
  const combined = { ...data };
  let posts = data.listing.posts.concat(moreData.listing.posts);
  posts = uniqBy(posts, p => p.name);
  combined.listing.posts = posts;
  return combined;
}

class ListingProvider extends React.Component {
  render() {
    const { pathname } = this.props;
    const variables = { pathname };
    return (
      <Query query={LISTING_QUERY} variables={variables}>
        {({ loading, error, fetchMore, data }) => {
          if (loading) {
            return <ListingLoading />;
          }

          if (error) {
            return <ListingError />;
          }

          return this.props.children({
            data,
            loadNextPage: () => {
              const posts = data.listing.posts || [];
              fetchMore({
                variables: {
                  ...variables,
                  after: (last(posts) || {}).name
                },
                updateQuery: (prev, { fetchMoreResult }) =>
                  combineQueries(prev, fetchMoreResult)
              });
            }
          });
        }}
      </Query>
    );
  }
}

export default ListingProvider;
