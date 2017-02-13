import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const EXAMPLE_QUERY = gql`
  query {
    topSubreddits {
      posts(limit: 5) {
        id
      }
    }
  }
`;

function ExampleData(props) {
  const { loading, data } = props;
  return (
    <div>
      <h1>Example Data!</h1>
    </div>
  );
}

export default graphql(EXAMPLE_QUERY)(ExampleData);
