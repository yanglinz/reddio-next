import React from "react";
import { View } from "react-native";

import ListingProvider from "../app/ListingProvider";
import PostList from "../components/PostList";

class Home extends React.Component {
  render() {
    return (
      <View>
        <ListingProvider pathname="/">
          {({ data }) => {
            const posts = data.listing.posts;
            return <PostList posts={posts} />;
          }}
        </ListingProvider>
      </View>
    );
  }
}

export default Home;
