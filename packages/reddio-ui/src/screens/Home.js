import React from "react";
import { View } from "react-native";

import ListingProvider from "../app/ListingProvider";
import PostListSort from "../components/PostListSort";
import PostList from "../components/PostList";

class Home extends React.Component {
  render() {
    return (
      <View>
        <ListingProvider pathname="/">
          {({ data }) => {
            const posts = data.listing.posts;
            return (
              <View>
                <PostListSort />
                <PostList posts={posts} />
              </View>
            );
          }}
        </ListingProvider>
      </View>
    );
  }
}

export default Home;
