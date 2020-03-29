import React from "react";
import { View, Button, Text, StyleSheet } from "react-native-web";
import Router from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListingSummary, { ListingSummarySkeleton } from "./ListingSummary";
import ServiceError from "../../components/ServiceError";
import { Stack } from "../../components/Spacing";
import * as TextNext from "../../components/Text";
import * as Layout from "../../components/Layout";
import * as design from "../../design";

import sassStyles from "./Home.module.scss";

const HOME_QUERY = gql`
  query HomeQuery {
    topSubreddits {
      listings {
        pathname
        customInfo {
          description
        }
        posts(limit: 20) {
          name
          title
          thumbnail
        }
      }
    }
  }
`;

function HomeIntro() {
  return (
    <div className={sassStyles.Intro}>
      <Layout.Wide>
        <Stack>
          <TextNext.Heading2 className={sassStyles.IntroTitle} size="xl">
            Discover new songs.
          </TextNext.Heading2>
          <TextNext.Heading3 className={sassStyles.IntroSubtitle} size="l">
            Powered by user curated content from reddit.
          </TextNext.Heading3>
        </Stack>
      </Layout.Wide>
    </div>
  );
}

function HomeExplore() {
  return (
    <View>
      <View style={styles.explore}>
        <Text style={styles.exploreTitle}>Explore more music communities</Text>
        <Button
          title="Explore"
          color={design.colors.primary.c5}
          onPress={() => Router.replace("/explore")}
        />
      </View>
    </View>
  );
}

function HomeLoading() {
  return (
    <View>
      <HomeIntro />

      <Layout.Wide>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Communities</Text>
          <Text style={styles.sectionSubtitleText}>Top subreddits</Text>

          <View style={styles.featuredSummaryList}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ListingSummarySkeleton key={i} />
            ))}
          </View>
        </View>
      </Layout.Wide>

      <HomeExplore />
    </View>
  );
}

function HomeError() {
  return (
    <View>
      <ServiceError />
    </View>
  );
}

class Home extends React.Component {
  render() {
    return (
      <Query query={HOME_QUERY}>
        {({ loading, error, data }) => {
          if (loading || true) {
            return <HomeLoading />;
          }

          if (error) {
            return <HomeError />;
          }

          const topListings = data.topSubreddits.listings || [];
          return (
            <View>
              <HomeIntro />

              <Layout.Wide>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Featured Communities</Text>
                  <Text style={styles.sectionSubtitleText}>Top subreddits</Text>

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
              </Layout.Wide>

              <HomeExplore />
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    alignItems: "center",
    paddingTop: design.spacing.larger2,
    paddingBottom: design.spacing.larger2
  },
  largeSection: {
    display: "flex",
    alignItems: "center",
    paddingTop: design.spacing.larger3,
    paddingBottom: design.spacing.larger3
  },
  sectionTitle: {
    fontSize: design.fontSize.larger1,
    marginBottom: design.spacing.small,
    color: design.colors.neutral.c3
  },
  sectionSubtitleText: {
    fontSize: design.fontSize.base,
    marginBottom: design.spacing.large,
    color: design.colors.neutral.c6
  },
  featuredSummaryList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  explore: {
    display: "flex",
    alignItems: "center",
    backgroundColor: design.colors.neutral.c4,
    padding: design.spacing.larger2,
    paddingBottom: design.spacing.larger3
  },
  exploreTitle: {
    fontSize: design.fontSize.large,
    marginBottom: design.spacing.small,
    color: design.colors.neutral.c10
  }
});

export default Home;
