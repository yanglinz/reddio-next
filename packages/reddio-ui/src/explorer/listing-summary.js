import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import uniq from "lodash/uniq";
import take from "lodash/take";

function ListingSummary(props) {
  const { pathname, posts } = props;
  let images = posts.map(p => p.thumbnail);
  images = images.filter(Boolean);
  images = images.filter(i => i.includes("https://") || i.includes("http://"));
  images = take(uniq(images), 5);

  return (
    <View style={styles.summary}>
      <Text style={styles.title}>{pathname}</Text>
      <View style={styles.imageReel}>
        {images.map(i => (
          <View key={i}>
            <Image style={styles.image} source={i} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  imageReel: {
    display: "flex",
    flexDirection: "row"
  },
  image: {
    width: 50,
    height: 50
  }
});

export default ListingSummary;
