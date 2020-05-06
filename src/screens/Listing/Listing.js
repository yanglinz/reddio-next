import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";

import ListingProvider from "./ListingProvider";
import ListingHeader from "./ListingHeader";
import PostListSort from "./PostSort";
import PostList, { PostListSkeleton } from "./PostList";
import ServiceError from "../../components/ServiceError";
import * as Layout from "../../components/Layout";
import * as playerStore from "../../store/player";

import styles from "./Listing.module.scss";

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

  useEffect(() => {
    dispatch(playerStore.appendPosts(posts));
  }, [posts, dispatch]);

  if (hasError) {
    return <ServiceError />;
  }

  return (
    <div className={styles.Listing}>
      <Layout.Standard>
        <div className={styles.ListingPosts}>
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
        </div>
      </Layout.Standard>
    </div>
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

export default ListingResolver;
