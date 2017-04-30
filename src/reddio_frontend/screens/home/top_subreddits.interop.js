import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const HOME_TOP_SUBREDDITS_QUERY = gql`
  query {
    topSubreddits {
      listings {
        pathname
        customInfo {
          description
        }
        posts(limit: 10) {
          name
          thumbnail
        }
      }
    }
  }
`;

const enhanceHomeTopSubredditQuery = graphql(HOME_TOP_SUBREDDITS_QUERY);

export default enhanceHomeTopSubredditQuery;
