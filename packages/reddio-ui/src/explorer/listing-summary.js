import React from "react";
import { View, Text, StyleSheet } from "react-native";
import uniqBy from "lodash/uniqBy";
import take from "lodash/take";

import Thumbnail from "../lib/thumbnail";

function ListingSummary(props) {
  const { pathname, posts, customInfo } = props;
  const { description } = customInfo;

  let thumbnailPosts = uniqBy(posts, p => p.thumbnail);
  // Take off the first post. It's usually a stickied post
  // TODO: filter by stickied
  thumbnailPosts.shift()
  thumbnailPosts = take(thumbnailPosts, 5);

  return (
    <View style={styles.summary}>
      <View style={styles.imageList}>
        {thumbnailPosts.map(p => (
          <View key={p.name}>
            <Thumbnail width={60} height={65} src={p.thumbnail} seed={p.name} />
          </View>
        ))}
      </View>
      <Text style={styles.title}>{pathname}</Text>
      <Text style={{}}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    backgroundColor: "#fff",
    width: 300,
    marginBottom: 20
  },
  imageList: {
    display: "flex",
    flexDirection: "row"
  },
  images: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  }
});

export default ListingSummary;
