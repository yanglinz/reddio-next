import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { withRouter } from "react-router";

import ListingProvider from "../app/ListingProvider";
import PostListSort from "../components/PostListSort";
import PostList from "../components/PostList";
import * as playbackStore from "../app/PlaybackStore";

function ListingView(props) {
  const { data, loadNextPage, dispatch } = props;
  const posts = data.listing.posts;

  useEffect(() => {
    dispatch(playbackStore.setPosts(posts));
  }, [posts]);

  return (
    <View>
      <PostListSort />
      <PostList posts={posts} loadNextPage={loadNextPage} />
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

export default withRouter(ListingResolver);
