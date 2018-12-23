import React from "react";
import { View, Text } from "react-native-web";

export function Post() {
  return (
    <View>
      <Text>This is a post</Text>
    </View>
  );
}

export function PostList() {
  const posts = [];
  return posts.map(p => <Post key={p.name} />);
}

export default PostList;
