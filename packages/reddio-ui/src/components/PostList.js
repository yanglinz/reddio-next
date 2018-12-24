import React from "react";
import { View, Text } from "react-native";

export function Post(props) {
  const {
    author,
    name,
    numComments,
    score,
    thumbnail,
    title,
    url
  } = props.post;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

export function PostList(props) {
  return props.posts.map(p => <Post key={p.name} post={p} />);
}

export default PostList;
