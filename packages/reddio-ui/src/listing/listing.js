import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { withRouter } from "react-router";

import ListingProvider from "./listing-provider";
import PostListSort from "./post-sort";
import PostList from "./post-list";
import * as playerStore from "../player/store";
import * as design from "../design";

function ListingView(props) {
  const { data, loadNextPage, dispatch } = props;
  const posts = data.listing.posts;

  useEffect(() => {
    dispatch(playerStore.setPosts(posts));
  }, [posts]);

  return (
    <View style={styles.listing}>
      <View style={styles.listingBackground}>
        <PostListSort />
        <PostList posts={posts} loadNextPage={loadNextPage} />
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
        {({ data, loadNextPage }) => (
          <ListingViewConnected data={data} loadNextPage={loadNextPage} />
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
  listingBackground: {
    backgroundColor: "#fff",
    marginTop: design.spacing.base,
    marginBottom: design.spacing.base,
    width: 850
  }
});

export default withRouter(ListingResolver);
