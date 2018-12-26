import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export function Post(props) {
  const { author, numComments, score, thumbnail, title, url } = props.post;
  return (
    <TouchableOpacity
      style={styles.post}
      onPress={() => props.onPress(props.post)}
    >
      <Image source={thumbnail} />
      <View>
        <Text href={url}>{title}</Text>
        <Text style={styles.postMeta}>
          {score} points | Posted by {author} | {numComments} comments
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function PostList(props) {
  const onPress = () => console.log("onPress");
  return props.posts.map(p => <Post key={p.name} post={p} onPress={onPress} />);
}

const styles = StyleSheet.create({
  post: {
    borderColor: "#DDD",
    borderBottomWidth: 1,
    padding: 16
  },
  postMeta: {
    color: "#999"
  }
});

export default PostList;
