import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withRouter } from "react-router-dom";
import uniqBy from "lodash/uniqBy";
import take from "lodash/take";

import Thumbnail from "../lib/thumbnail";
import * as design from "../design";

function ListingSummary(props) {
  const { pathname, posts, customInfo, history } = props;
  const { description } = customInfo;

  let thumbnailPosts = uniqBy(posts, p => p.thumbnail);
  // Take off the first post. It's usually a stickied post
  // TODO: filter by stickied
  thumbnailPosts.shift();
  thumbnailPosts = take(thumbnailPosts, 5);

  return (
    <View style={styles.summary}>
      <View style={styles.imageList}>
        {thumbnailPosts.map(p => (
          <View key={p.name}>
            <Thumbnail width={60} height={60} src={p.thumbnail} seed={p.name} />
          </View>
        ))}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} onPress={() => history.push(pathname)}>
          {pathname}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    width: 300,
    paddingBottom: design.spacing.base,
    marginBottom: design.spacing.base,
    backgroundColor: "#fff",
    borderRadius: 2,
    overflow: "hidden"
  },
  imageList: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    padding: design.spacing.base
  },
  title: {
    fontSize: design.fontSize.large,
    marginBottom: design.spacing.smaller1
  },
  description: {
    fontSize: design.fontSize.small,
    color: design.fontColors.lightGray
  }
});

export default withRouter(ListingSummary);
