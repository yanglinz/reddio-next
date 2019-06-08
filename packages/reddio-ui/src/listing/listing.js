import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { withRouter } from "react-router";
import isEmpty from "lodash/isEmpty";

import ListingProvider from "./listing-provider";
import ListingHeader from "./listing-header";
import PostListSort from "./post-sort";
import PostList, { PostListSkeleton } from "./post-list";
import * as Layout from "../layout";
import * as playerStore from "../player/store";
import * as design from "../design";

function ListingError() {
  return (
    <View>
      <Text>:(</Text>
    </View>
  );
}

function ListingView(props) {
  const {
    loading,
    error,
    pathname,
    info,
    posts,
    pageInfo,
    loadNextPage,
    isRefetching,
    dispatch
  } = props;

  const hasError = isEmpty(posts) && error;
  const isLoading = isEmpty(posts) && loading && !isRefetching;

  if (hasError) {
    return <ListingError />;
  }

  const mq = Layout.useMediaQuery();
  useEffect(() => {
    dispatch(playerStore.appendPosts(posts));
  }, [posts]);

  return (
    <View style={styles.listing}>
      <Layout.Standard>
        <View
          style={
            mq.medium
              ? [styles.listingBg, styles.listingBgMed]
              : styles.listingBg
          }
        >
          <ListingHeader pathname={pathname} info={info} />
          <PostListSort />
          {isLoading ? (
            <PostListSkeleton />
          ) : (
            <PostList
              posts={posts}
              pageInfo={pageInfo}
              loadNextPage={loadNextPage}
              isRefetching={isRefetching}
            />
          )}
        </View>
      </Layout.Standard>
    </View>
  );
}

const ListingViewConnected = connect()(ListingView);

class ListingResolver extends React.Component {
  render() {
    const { location } = this.props;
    const pathname = location.pathname + location.search;

    return (
      <ListingProvider pathname={pathname}>
        {renderProps => (
          <ListingViewConnected pathname={pathname} {...renderProps} />
        )}
      </ListingProvider>
    );
  }
}

const styles = StyleSheet.create({
  listing: {},
  listingBg: {
    backgroundColor: "#fff"
  },
  listingBgMed: {
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base
  },
  header: {
    paddingTop: design.spacing.base,
    paddingBottom: design.spacing.base,
    paddingLeft: design.spacing.small,
    paddingRight: design.spacing.small,
    borderBottomColor: design.colors.neutral.c10,
    borderBottomWidth: 1
  },
  title: {
    fontSize: design.fontSize.small,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  subtitle: {
    marginTop: design.spacing.smaller1,
    fontSize: design.fontSize.small,
    color: design.colors.neutral.c5
  }
});

export default withRouter(ListingResolver);
