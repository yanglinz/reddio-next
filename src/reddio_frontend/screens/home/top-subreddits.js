import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const HOME_TOP_SUBREDDITS_QUERY = gql`
  query {
    topSubreddits {
      posts(limit: 5) {
        id
      }
    }
  }
`;

const enhanceHomeTopSubredditQuery = graphql(HOME_TOP_SUBREDDITS_QUERY);

export default enhanceHomeTopSubredditQuery;
