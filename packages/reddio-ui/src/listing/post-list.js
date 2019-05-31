import React from "react";
import {
  View,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import Thumbnail from "../lib/thumbnail";
import * as reddit from "../lib/reddit";
import * as playerStore from "../player/store";
import * as design from "../design";

function mapStateToProps(state) {
  return {
    activePost: playerStore.selectActivePost(state)
  };
}

export function Post(props) {
  const { post, activePost } = props;
  const { name, author, numComments, score, thumbnail, title, url } = post;
  const isActive = activePost && activePost.name === name;
  const isPlayable = reddit.isPostPlayable(url);

  const postBody = (
    <React.Fragment>
      <View style={styles.thumbnail}>
        <Thumbnail
          title={title}
          src={thumbnail}
          width={45}
          height={45}
          seed={name}
        />
      </View>
      <View>
        <Text
          href={url}
          style={isPlayable ? undefined : styles.titleUnplayable}
        >
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Text>
        <Text style={styles.postMeta}>
          {score} points | Posted by {author} | {numComments} comments
        </Text>
      </View>
    </React.Fragment>
  );
  return isPlayable ? (
    <TouchableOpacity
      style={isActive ? [styles.post, styles.postActive] : styles.post}
      onPress={() => props.onPress(props.post)}
    >
      {postBody}
    </TouchableOpacity>
  ) : (
    <View style={styles.post}>{postBody}</View>
  );
}

export function PostListSkeleton() {
  return (
    <View>
      <Text>Hello world!</Text>
    </View>
  );
}

const flatListKeyExtractor = p => p.name;

export function PostList(props) {
  const {
    posts,
    pageInfo,
    activePost,
    loadNextPage,
    isRefetching,
    dispatch
  } = props;

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            activePost={activePost}
            onPress={() => dispatch(playerStore.playPost(item.name))}
          />
        )}
        extraData={{
          // Invalidate cache and re-render
          itemCount: (posts && posts.length) || 0,
          activePostName: activePost && activePost.name
        }}
        keyExtractor={flatListKeyExtractor}
      />

      {pageInfo.hasNextPage ? (
        <Button
          color={design.colors.primary.c4}
          onPress={loadNextPage}
          title="Load More"
          disabled={isRefetching}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderTopWidth: 1,
    padding: design.spacing.small
  },
  thumbnail: {
    marginRight: design.spacing.small
  },
  postActive: {
    borderLeftColor: "#999",
    borderLeftWidth: 5
  },
  titleUnplayable: {
    color: "#aaa"
  },
  postMeta: {
    color: "#999"
  }
});

export default connect(mapStateToProps)(PostList);
