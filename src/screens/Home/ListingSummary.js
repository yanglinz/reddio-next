import React from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { withRouter } from "react-router-dom";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import uniqBy from "lodash/uniqBy";

import Thumbnail from "../../components/Thumbnail";
import Skeleton from "../../components/Skeleton";
import * as design from "../../design";

export function ListingSummarySkeleton() {
  return (
    <View style={styles.summary}>
      <Skeleton width={300} height={60} />

      <View style={styles.content}>
        <View style={{ height: design.spacing.smaller1 }} />
        <Skeleton width={140} height={design.fontSize.large} />
        <View style={{ height: design.spacing.smaller1 }} />
        <Skeleton width={220} height={design.fontSize.larger2} />
      </View>
    </View>
  );
}

export function ListingSummary(props) {
  const { pathname, posts, customInfo, history } = props;
  const { description } = customInfo;

  let thumbnailPosts = posts;
  // Take posts that have valid thumbnail
  // Which may sometimes be null, or "self"
  thumbnailPosts = sortBy(
    thumbnailPosts,
    p => p.thumbnail && p.thumbnail.length > 4
  );
  thumbnailPosts = uniqBy(thumbnailPosts, p => p.thumbnail);
  // Take off the first post. It's usually a stickied post
  thumbnailPosts.shift();
  thumbnailPosts = take(thumbnailPosts, 5);

  return (
    <View style={styles.summary}>
      <View style={styles.imageList}>
        {thumbnailPosts.map(p => (
          <View key={p.name}>
            <Thumbnail
              title={p.title}
              width={60}
              height={60}
              src={p.thumbnail}
              seed={p.name}
            />
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
    overflow: "hidden",
    boxShadow: `0 1px 10px rgba(0, 0, 0, 0.15)`
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
    marginBottom: design.spacing.smaller1,
    color: design.colors.primary.c2
  },
  description: {
    fontSize: design.fontSize.small,
    color: design.colors.neutral.c6
  }
});

export default withRouter(ListingSummary);
