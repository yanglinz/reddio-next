import React from "react";
import {
  View,
  FlatList,
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import * as playbackStore from "../app/PlaybackStore";

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

const flatListKeyExtractor = p => p.name;

export function PostList(props) {
  const { loadNextPage, dispatch } = props;

  return (
    <View>
      <FlatList
        data={props.posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            onPress={() => dispatch(playbackStore.playPost(item.name))}
          />
        )}
        keyExtractor={flatListKeyExtractor}
      />

      <Button onPress={loadNextPage} title="Load More" />
    </View>
  );
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

export default connect()(PostList);
