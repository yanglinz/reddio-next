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

function HomeTopSubreddits(props) {
  const { loading, data } = props;
  return (
    <div>
      <h1>Home: Top Subreddits</h1>
    </div>
  );
}

const enhancer = graphql(HOME_TOP_SUBREDDITS_QUERY);

export default enhancer(HomeTopSubreddits);
