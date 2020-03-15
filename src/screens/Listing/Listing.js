import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native-web";
import { withRouter } from "react-router";
import isEmpty from "lodash/isEmpty";

import ListingProvider from "./ListingProvider";
import ListingHeader from "./ListingHeader";
import PostListSort from "./PostSort";
import PostList, { PostListSkeleton } from "./PostList";
import ServiceError from "../../components/ServiceError";
import * as Layout from "../../components/Layout";
import * as playerStore from "../../store/player";
import * as design from "../../design";

function LoadError() {
  return (
    <View style={styles.listing}>
      <Layout.Standard>
        <ServiceError />
      </Layout.Standard>
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

  const mq = Layout.useMediaQuery();
  useEffect(() => {
    dispatch(playerStore.appendPosts(posts));
  }, [posts, dispatch]);

  if (hasError) {
    return <LoadError />;
  }

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
    backgroundColor: "#fff",
    marginBottom: design.spacing.larger2
  },
  listingBgMed: {
    marginTop: design.spacing.base,
    marginBottom: design.spacing.larger2
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
