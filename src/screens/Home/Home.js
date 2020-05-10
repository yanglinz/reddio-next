import React, { useEffect } from "react";
import Router from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import take from "lodash/take";
import { connect } from "react-redux";

import { Stack, Text } from "../../vendor/ui-system";
import Button from "../../components/Button";
import ListingSummary, { ListingSummarySkeleton } from "./ListingSummary";
import ListingPost, { ListingPostSkeleton } from "./ListingPost";
import ServiceError from "../../components/ServiceError";
import * as Layout from "../../components/Layout";
import * as playerStore from "../../store/player";
import * as design from "../../styles/design";

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
    listing(pathname: "/r/listentothis") {
      posts {
        author
        name
        numComments
        score
        thumbnail
        title
        url
      }
    }
  }
`;

function HomeExplore() {
  return (
    <div className={styles.Explore}>
      <Stack spacing={design.space.l}>
        <Text className={styles.ExploreTitle} size={design.font.l}>
          Explore more music communities
        </Text>

        <div className={styles.ExploreButton}>
          <Button onClick={() => Router.replace("/explore")}>Explore</Button>
        </div>
      </Stack>
    </div>
  );
}

function HomeListenToThis(props) {
  const { loading, data, dispatch } = props;

  let posts = (data && data.listing && data.listing.posts) || [];
  posts = posts.filter(p => p.thumbnail && p.thumbnail.includes("https://"));
  posts = take(posts, 5);

  useEffect(() => {
    dispatch && dispatch(playerStore.setPosts(posts));
  }, [posts, dispatch]);

  let content;
  if (loading) {
    content = (
      <div>
        {Array.from({ length: 5 }).map((_, i) => {
          return <ListingPostSkeleton key={i} seed={i} />;
        })}
      </div>
    );
  } else {
    content = (
      <div>
        {posts.map(p => (
          <ListingPost
            key={p.name}
            author={p.author}
            title={p.title}
            thumbnail={p.thumbnail}
            score={p.score}
            numComments={p.numComments}
            name={p.name}
            onClick={() => dispatch(playerStore.playPost(p.name))}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.ListenToThis}>
      <Layout.Wide>
        <Stack spacing={design.space.xl}>
          <Stack spacing={design.space.m}>
            <Text className={styles.SectionTitle} size={design.font.l}>
              Top Posts
            </Text>
            <Text className={styles.SectionSubtitle} size={design.font.m}>
              Listen to this week's top posts
            </Text>
          </Stack>
          {content}
        </Stack>
      </Layout.Wide>
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
    <div className={styles.Featured}>
      <Layout.Wide>
        <Stack spacing={design.space.xl}>
          <Stack spacing={design.space.m}>
            <Text className={styles.SectionTitle} size={design.font.l}>
              Featured Communities
            </Text>
            <Text className={styles.SectionSubtitle} size={design.font.m}>
              Music from top subreddits
            </Text>
          </Stack>
          {content}
        </Stack>
      </Layout.Wide>
    </div>
  );
}

function HomeLoading() {
  return (
    <div>
      <HomeListenToThis loading={true} data={undefined} />
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
    const { dispatch } = this.props;
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
              <HomeListenToThis
                dispatch={dispatch}
                loading={false}
                data={data}
              />
              <HomeFeatured loading={false} data={data} />
              <HomeExplore />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default connect()(HomeContainer);
