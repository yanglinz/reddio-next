import React from "react";
import { View, Text } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import uniqBy from "lodash/uniqBy";

import Loading from "../lib/loading";

const LISTING_QUERY = gql`
  query ListingQuery($pathname: String!, $after: String) {
    listing(pathname: $pathname) {
      paginatedPosts(after: $after) {
        posts {
          author
          name
          numComments
          score
          thumbnail
          title
          url
        }
        pageInfo {
          nextCursor
          hasNextPage
        }
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

          const paginatedPosts = data.listing.paginatedPosts || {};
          const { posts, pageInfo } = paginatedPosts;

          return this.props.children({
            posts,
            pageInfo,
            loadNextPage: () => {
              fetchMore({
                variables: {
                  ...variables,
                  after: pageInfo && pageInfo.nextCuorsor
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
