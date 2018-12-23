import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LISTING_QUERY = gql`
  query ListingQuery($pathname: String!) {
    listing(pathname: $pathname) {
      posts {
        name
      }
    }
  }
`;

class ListingProvider extends React.Component {
  render() {
    const { pathname } = this.props;
    const variables = { pathname };
    return (
      <Query query={LISTING_QUERY} variables={variables}>
        {({ loading, error, data }) => {
          console.log({ loading, error, data });

          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return null;
        }}
      </Query>
    );
  }
}

export default ListingProvider;
