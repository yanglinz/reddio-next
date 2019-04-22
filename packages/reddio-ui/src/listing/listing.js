import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { withRouter } from "react-router";

import ListingProvider from "./listing-provider";
import PostListSort from "./post-sort";
import PostList from "./post-list";
import useMediaQuery from "../lib/media-query-hook";
import * as playerStore from "../player/store";
import * as design from "../design";

function ListingView(props) {
  const {
    pathname,
    posts,
    pageInfo,
    loadNextPage,
    isRefetching,
    dispatch
  } = props;

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
        <View style={styles.title}>
          <Text style={styles.titleText}>{pathname}</Text>
        </View>
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
            pathname={pathname}
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
    width: design.layoutWidth.medium - design.spacing.large * 2,
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base
  },
  title: {
    paddingTop: design.spacing.base,
    paddingBottom: design.spacing.base,
    paddingLeft: design.spacing.small,
    paddingRight: design.spacing.small,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: design.fontSize.base,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1
  }
});

export default withRouter(ListingResolver);
