import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { Box, Inline, Stack, Text } from "../../vendor/ui-system";
import Button from "../../components/Button";
import Clickable from "../../components/Clickable";
import Thumbnail from "../../components/Thumbnail";
import Skeleton from "../../components/Skeleton";
import * as reddit from "../../lib/reddit";
import * as playerStore from "../../store/player";
import * as design from "../../styles/design";
import { space as s, font as f } from "../../styles/design";

import styles from "./PostList.module.scss";

function mapStateToProps(state) {
  return {
    activePost: playerStore.selectActivePost(state)
  };
}

const randomPostDimensions = [
  [120, 289],
  [160, 202],
  [140, 178],
  [220, 370],
  [180, 245]
];

export function PostSkeleton(props) {
  const index = props.index % randomPostDimensions.length;
  const [titleWidth, descriptionWidth] = randomPostDimensions[index] || [];
  return (
    <div className={styles.PostSkeleton}>
      <Box padding={s.m}>
        <Inline spacing={s.m} vcentered>
          <Skeleton width={45} height={45} />
          <Stack spacing={s.xs}>
            <Skeleton width={titleWidth} height={design.fontSize.base} />
            <Skeleton width={descriptionWidth} height={design.fontSize.base} />
          </Stack>
        </Inline>
      </Box>
    </div>
  );
}

function formatTitle(title) {
  const threshold = 80;
  if (title.length > threshold) {
    return title.substr(0, threshold) + "...";
  }
  return title;
}

export function Post(props) {
  const { post, activePost } = props;
  const { name, author, numComments, score, thumbnail, title, url } = post;
  const isActive = activePost && activePost.name === name;
  const isPlayable = reddit.isPostPlayable(url);

  const postBody = (
    <Box padding={s.m}>
      <Inline spacing={s.m} vcentered>
        <Thumbnail
          title={title}
          src={thumbnail}
          width={45}
          height={45}
          seed={name}
        />
        <Stack spacing={s.s}>
          <Text size={f.s} className={styles.PostTitle}>
            <div dangerouslySetInnerHTML={{ __html: formatTitle(title) }} />
          </Text>
          <Text size={f.s} className={styles.PostDescription}>
            {score} points | Posted by {author} | {numComments} comments
          </Text>
        </Stack>
      </Inline>
    </Box>
  );

  const clsName = classNames(styles.Post, {
    [styles.PostActive]: isActive,
    [styles.PostUnplayable]: !isPlayable
  });
  return (
    <div className={clsName}>
      {isPlayable ? (
        <Clickable onClick={() => props.onPress(props.post)} focusOnlyOnTab>
          {postBody}
        </Clickable>
      ) : (
        postBody
      )}
    </div>
  );
}

export function PostListSkeleton() {
  const count = 25;
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => {
        return <PostSkeleton key={i} index={i} />;
      })}
    </div>
  );
}

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
    <div>
      <div className={styles.Posts}>
        {posts.map(post => (
          <Post
            key={post.name}
            post={post}
            activePost={activePost}
            onPress={() => {
              dispatch(playerStore.setPosts(posts));
              dispatch(playerStore.playPost(post.name));
            }}
          />
        ))}
      </div>

      {pageInfo.hasNextPage ? (
        <div className={styles.Pagination}>
          <Box padding={s.l}>
            <Button onClick={loadNextPage} isDisabled={isRefetching}>
              Load More
            </Button>
          </Box>
        </div>
      ) : null}
    </div>
  );
}

export default connect(mapStateToProps)(PostList);
