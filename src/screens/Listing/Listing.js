import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native-web";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";

import ListingProvider from "./ListingProvider";
import ListingHeader from "./ListingHeader";
import PostListSort from "./PostSort";
import PostList, { PostListSkeleton } from "./PostList";
import ServiceError from "../../components/ServiceError";
import * as Layout from "../../components/Layout";
import * as playerStore from "../../store/player";
import * as design from "../../styles/design";

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

  // TODO fix media query
  const isMediumWidth = true;
  const style = isMediumWidth
    ? [styles.listingBg, styles.listingBgMed]
    : styles.listingBg;

  useEffect(() => {
    dispatch(playerStore.appendPosts(posts));
  }, [posts, dispatch]);

  if (hasError) {
    return <ServiceError />;
  }

  return (
    <View style={styles.listing}>
      <Layout.Standard>
        <View style={style}>
          <ListingHeader pathname={pathname} info={info} />
          <PostListSort pathname={pathname} />
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

function ListingResolver() {
  const router = useRouter();
  const pathname = router.asPath;
  return (
    <ListingProvider pathname={pathname}>
      {renderProps => (
        <ListingViewConnected pathname={pathname} {...renderProps} />
      )}
    </ListingProvider>
  );
}

const styles = StyleSheet.create({
  listingBg: {
    backgroundColor: "#fff",
    marginBottom: design.spacing.larger2
  },
  listingBgMed: {
    marginTop: design.spacing.base,
    marginBottom: design.spacing.larger2
  }
});

export default ListingResolver;
