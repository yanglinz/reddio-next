import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ListingSummary from "./listing-summary";
import * as design from "../design";

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
            <View style={styles.home}>
              <View>
                <Text style={styles.sectionTitle}>Featured Communities</Text>
                <Text style={styles.sectionSubtitle}>Top subreddits</Text>
                <View style={styles.featuredSummaryList}>
                  {topListings.map(listingInfo => (
                    <ListingSummary
                      key={listingInfo.pathname}
                      pathname={listingInfo.pathname}
                      customInfo={listingInfo.customInfo}
                      posts={listingInfo.posts}
                    />
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    display: "flex",
    alignItems: "center",
    paddingTop: design.spacing.larger2,
    paddingBottom: design.spacing.larger2
  },
  sectionTitle: {
    fontSize: design.fontSize.larger1,
    marginBottom: design.spacing.small
  },
  sectionSubtitle: {
    fontSize: design.fontSize.base,
    marginBottom: design.spacing.large,
    color: design.fontColors.lightGray
  },
  featuredSummaryList: {
    width: 900 + design.spacing.small * 3,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});

export default Home;
