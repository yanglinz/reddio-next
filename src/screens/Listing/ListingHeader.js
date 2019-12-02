import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Skeleton from "../../lib/skeleton";
import * as reddit from "../../lib/reddit";
import * as design from "../../design";

function ListingHeader(props) {
  const { pathname, info } = props;

  let subscribers = "";
  const infoType = info && info.__typename;
  if (infoType === "ListingSubredditInfo") {
    const subscriberCount = (info.info && info.info.subscribers) || 0;
    subscribers =
      subscribers === 1
        ? "1 subscriber"
        : `${subscriberCount.toLocaleString()} subscribers`;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.titleText}>
        {reddit.getCleanedPathname(pathname)}
      </Text>
      {subscribers ? (
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>{subscribers}</Text>
        </View>
      ) : (
        <View style={styles.subtitle}>
          <Skeleton width={115} height={design.fontSize.base} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: design.spacing.base,
    paddingBottom: design.spacing.base,
    paddingLeft: design.spacing.small,
    paddingRight: design.spacing.small,
    borderBottomColor: design.colors.neutral.c10,
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: design.fontSize.small,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  subtitle: {
    marginTop: design.spacing.smaller1
  },
  subtitleText: {
    fontSize: design.fontSize.small,
    color: design.colors.neutral.c5
  }
});

export default ListingHeader;
