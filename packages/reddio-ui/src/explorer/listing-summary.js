import React from "react";
import { View, Text, StyleSheet } from "react-native";
import uniq from "lodash/uniq";
import take from "lodash/take";

import Thumbnail from "../lib/thumbnail";

function ListingSummary(props) {
  const { pathname, posts, customInfo } = props;
  const { description } = customInfo;

  let images = posts.map(p => p.thumbnail);
  images = images.filter(Boolean);
  images = images.filter(i => i.includes("https://") || i.includes("http://"));
  images = take(uniq(images), 5);

  return (
    <View style={styles.summary}>
      <View style={styles.imageList}>
        {images.map(i => (
          <View key={i}>
            <Thumbnail width={60} height={65} src={i} seed={i} />
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
