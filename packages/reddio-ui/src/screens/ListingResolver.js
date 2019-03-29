import React from "react";
import { View } from "react-native";
import { withRouter } from "react-router";

import ListingProvider from "../app/ListingProvider";
import PostListSort from "../components/PostListSort";
import PostList from "../components/PostList";

class ListingResolver extends React.Component {
  render() {
    const { location } = this.props;
    const pathname = location.pathname + location.search;

    return (
      <View>
        <ListingProvider pathname={pathname}>
          {({ data, loadNextPage }) => {
            const posts = data.listing.posts;
            return (
              <View>
                <PostListSort />
                <PostList posts={posts} loadNextPage={loadNextPage} />
              </View>
            );
          }}
        </ListingProvider>
      </View>
    );
  }
}

export default withRouter(ListingResolver);
