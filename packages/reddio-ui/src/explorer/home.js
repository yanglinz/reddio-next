import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ListingSummary from "./listing-summary";

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

function HomeLoading() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}

function HomeError() {
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
            return <HomeLoading />;
          }

          if (error) {
            return <HomeError />;
          }

          const topListings = data.topSubreddits.listings || [];
          return (
            <View>
              {topListings.map(listingInfo => (
                <ListingSummary
                  key={listingInfo.pathname}
                  pathname={listingInfo.pathname}
                  customInfo={listingInfo.customInfo}
                  posts={listingInfo.posts}
                />
              ))}
            </View>
          );
        }}
      </Query>
    );
  }
}

export default Home;
