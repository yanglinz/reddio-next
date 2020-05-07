import React from "react";

import Clickable from "../../components/Clickable";
import Skeleton from "../../components/Skeleton";
import Thumbnail from "../../components/Thumbnail";
import * as Spacing from "../../components/Spacing";
import * as Text from "../../components/Text";

import styles from "./ListingPost.module.scss";

export function ListingPostSkeleton(props) {
  const { seed } = props;
  return (
    <div className={styles.ListingPost}>
      <Spacing.Inline>
        <Thumbnail width={110} height={110} seed={seed} />
        <Spacing.Stack spacing="s">
          <Skeleton width={210} height={25} />
          <Spacing.Inline spacing="s">
            <Skeleton width={50} height={25} />
            <Skeleton width={180} height={25} />
            <Skeleton width={70} height={25} />
          </Spacing.Inline>
        </Spacing.Stack>
      </Spacing.Inline>
    </div>
  );
}

function ListingPost(props) {
  const { author, name, numComments, onClick, score, title, thumbnail } = props;
  return (
    <div className={styles.ListingPost}>
      <Clickable focusOnlyOnTab onClick={onClick}>
        <Spacing.Inline>
          <Thumbnail src={thumbnail} width={110} height={110} seed={name} />
          <Spacing.Stack>
            <Text.Text className={styles.ListingPostTitle} size="l">
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </Text.Text>
            <Text.Text className={styles.ListingPostMeta} size="m">
              {`${score} point${score === 1 ? "" : "s"}`}
              <span className={styles.ListingPostMetaDivider}> | </span>
              Posted by {author}
              <span className={styles.ListingPostMetaDivider}> | </span>
              {`${numComments} comment${numComments === 1 ? "" : "s"}`}
            </Text.Text>
          </Spacing.Stack>
        </Spacing.Inline>
      </Clickable>
    </div>
  );
}

export default ListingPost;
