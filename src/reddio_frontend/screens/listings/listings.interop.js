import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LISTINGS_QUERY = gql`
  query ($urlPath: String, $after: String) {
    posts(urlPath: $urlPath, after: $after) {
      name
      title
      url
    }
  }
`;

function mapPropsToOptions(props) {
  const { urlPath } = props;
  const variables = { urlPath };
  const newProps = { variables };
  return newProps;
}

function updateQuery(previousResult, { fetchMoreResult }) {
  const previousPosts = previousResult.posts;
  const newPosts = fetchMoreResult.data.posts;
  return {
    posts: [].concat(previousPosts).concat(newPosts)
  };
}

function getPostsAfterCursor(posts) {
  const lastPost = posts && posts[posts.length - 1];
  const afterCursor = lastPost && lastPost.name;
  return afterCursor;
}

function mapPropsToProps(props) {
  const { data } = props;
  const { posts, variables, fetchMore } = data;
  const after = getPostsAfterCursor(posts);

  const fetchMorePosts = () => fetchMore({
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
