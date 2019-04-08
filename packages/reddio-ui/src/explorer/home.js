import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const HOME_QUERY = gql`
  query HomeQuery {
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

function ListingLoading() {
  return (
    <View>
      <ActivityIndicator />
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

class Home extends React.Component {
  render() {
    return (
      <Query query={HOME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ListingLoading />;
          }

          if (error) {
            return <ListingError />;
          }

          return (
            <View>
              <Text>Hello world</Text>
            </View>
          );
        }}
      </Query>
    );
  }
}

export default Home;
