import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LISTINGS_QUERY = gql`
  query ($pathname: String, $sortType: String, $sortRange: String, $after: String) {
    listing(pathname: $pathname) {
      posts(sortType: $sortType, sortRange: $sortRange, after: $after) {
        author
        name
        numComments
        score
        title
        thumbnail
        url
      }
    }
  }
`;

function mapPropsToOptions(props) {
  const { pathname, sortType, sortRange } = props;
  const variables = { pathname, sortType, sortRange };
  const newProps = { variables };
  return newProps;
}

function updateQuery(previousResult, { fetchMoreResult }) {
  const previousPosts = previousResult.listing.posts;
  const newPosts = fetchMoreResult.listing.posts;
  return {
    listing: {
      posts: [].concat(previousPosts).concat(newPosts)
    }
  };
}

function getPostsAfterCursor(posts) {
  const lastPost = posts && posts[posts.length - 1];
  const afterCursor = lastPost && lastPost.name;
  return afterCursor;
}

function mapPropsToProps(props) {
  const { data } = props;
  const { listing, variables, fetchMore } = data;
  const { posts } = listing || {};
  const after = getPostsAfterCursor(posts);

  const fetchMorePosts = () =>
    fetchMore({
      query: LISTINGS_QUERY,
      variables: Object.assign({}, variables, { after }),
      updateQuery
    });

  const newData = Object.assign({}, data, { fetchMorePosts });
  const newProps = Object.assign({}, { data: newData });
  return newProps;
}

const queryParams = {
  props: mapPropsToProps,
  options: mapPropsToOptions
};

const enhanceListingsQuery = graphql(LISTINGS_QUERY, queryParams);

export default enhanceListingsQuery;
