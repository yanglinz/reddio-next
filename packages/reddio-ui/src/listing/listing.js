import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { withRouter } from "react-router";

import ListingProvider from "./listing-provider";
import PostListSort from "./post-sort";
import PostList from "./post-list";
import useMediaQuery from "../lib/media-query-hook";
import * as playerStore from "../player/store";
import * as design from "../design";

function ListingView(props) {
  const { posts, pageInfo, loadNextPage, isRefetching, dispatch } = props;

  const mq = useMediaQuery();
  useEffect(() => {
    dispatch(playerStore.setPosts(posts));
  }, [posts]);

  return (
    <View style={styles.listing}>
      <View
        style={
          mq.medium ? [styles.listingBg, styles.listingBgMed] : styles.listingBg
        }
      >
        <PostListSort />
        <PostList
          posts={posts}
          pageInfo={pageInfo}
          loadNextPage={loadNextPage}
          isRefetching={isRefetching}
        />
      </View>
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
        {({ posts, pageInfo, loadNextPage, isRefetching }) => (
          <ListingViewConnected
            posts={posts}
            pageInfo={pageInfo}
            loadNextPage={loadNextPage}
            isRefetching={isRefetching}
          />
        )}
      </ListingProvider>
    );
  }
}

const styles = StyleSheet.create({
  listing: {
    justifyContent: "center",
    alignItems: "center"
  },
  listingBg: {
    backgroundColor: "#fff"
  },
  listingBgMed: {
    width: design.layoutWidth.medium,
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base
  }
});

export default withRouter(ListingResolver);
