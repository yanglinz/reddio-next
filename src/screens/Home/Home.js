import React from "react";
import { Button } from "react-native-web";
import Router from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListingSummary, { ListingSummarySkeleton } from "./ListingSummary";
import ServiceError from "../../components/ServiceError";
import { Stack } from "../../components/Spacing";
import * as Text from "../../components/Text";
import * as Layout from "../../components/Layout";
import * as design from "../../design";

import styles from "./Home.module.scss";

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
    <div className={styles.Intro}>
      <Layout.Wide>
        <Stack>
          <Text.Heading2 className={styles.IntroTitle} size="xl">
            Discover new songs.
          </Text.Heading2>
          <Text.Heading3 className={styles.IntroSubtitle} size="l">
            Powered by user curated content from reddit.
          </Text.Heading3>
        </Stack>
      </Layout.Wide>
    </div>
  );
}

function HomeExplore() {
  return (
    <div className={styles.Explore}>
      <Stack>
        <Text.Heading4 className={styles.ExploreTitle} size="l">
          Explore more music communities
        </Text.Heading4>

        <div style={{ width: 150, margin: "0 auto" }}>
          <Button
            title="Explore"
            color={design.colors.primary.c5}
            onPress={() => Router.replace("/explore")}
          />
        </div>
      </Stack>
    </div>
  );
}

function HomeFeatured(props) {
  const { loading, data } = props;

  let content;
  if (loading) {
    content = (
      <div className={styles.FeatureSummary}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ListingSummarySkeleton key={i} />
        ))}
      </div>
    );
  } else {
    const topListings = data.topSubreddits.listings || [];
    content = (
      <div className={styles.FeatureSummary}>
        {topListings.map(listingInfo => (
          <ListingSummary
            key={listingInfo.pathname}
            pathname={listingInfo.pathname}
            customInfo={listingInfo.customInfo}
            posts={listingInfo.posts}
          />
        ))}
      </div>
    );
  }

  return (
    <Layout.Wide>
      <div className={styles.Featured}>
        <Stack spacing="xl">
          <Stack spacing="s">
            <Text.Heading4 className={styles.FeaturedTitle} size="l">
              Featured Communities
            </Text.Heading4>
            <Text.Text className={styles.FeaturedSubtitle} size="m">
              Music from top subreddits
            </Text.Text>
          </Stack>
          {content}
        </Stack>
      </div>
    </Layout.Wide>
  );
}

function HomeLoading() {
  return (
    <div>
      <HomeIntro />
      <HomeFeatured loading={true} data={undefined} />
      <HomeExplore />
    </div>
  );
}

function HomeError() {
  return (
    <div>
      <ServiceError />
    </div>
  );
}

class HomeContainer extends React.Component {
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

          return (
            <div>
              <HomeIntro />
              <HomeFeatured loading={false} data={data} />
              <HomeExplore />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default HomeContainer;
