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

import * as reddit from "../lib/reddit";
import * as playerStore from "../player/store";

export function Post(props) {
  const { author, numComments, score, thumbnail, title, url } = props.post;
  const isPlayable = reddit.isPostPlayable(url);

  const postBody = (
    <React.Fragment>
      <Image source={thumbnail} />
      <View>
        <Text
          href={url}
          style={isPlayable ? undefined : styles.postTitleUnplayable}
        >
          {title}
        </Text>
        <Text style={styles.postMeta}>
          {score} points | Posted by {author} | {numComments} comments
        </Text>
      </View>
    </React.Fragment>
  );
  return isPlayable ? (
    <TouchableOpacity
      style={styles.post}
      onPress={() => props.onPress(props.post)}
    >
      {postBody}
    </TouchableOpacity>
  ) : (
    <View style={styles.post}>{postBody}</View>
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
    borderColor: "#ddd",
    borderBottomWidth: 1,
    padding: 16
  },
  postTitleUnplayable: {
    color: "#aaa"
  },
  postMeta: {
    color: "#999"
  }
});

export default connect()(PostList);
