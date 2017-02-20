import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function mapPropsToVariables(props) {
  const { urlPath } = props;
  const variables = { urlPath };
  return { variables };
}

const LISTINGS_QUERY = gql`
  query ($urlPath: String) {
    posts(urlPath: $urlPath) {
      id
      title
    }
  }
`;

const queryParams = { options: mapPropsToVariables };

const enhanceListingsQuery = graphql(LISTINGS_QUERY, queryParams);

export default enhanceListingsQuery;
