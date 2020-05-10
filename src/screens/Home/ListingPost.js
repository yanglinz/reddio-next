import React from "react";

import { Inline, Stack, Text } from "../../vendor/ui-system";
import Clickable from "../../components/Clickable";
import Skeleton from "../../components/Skeleton";
import Thumbnail from "../../components/Thumbnail";
import { font as f, space as s } from "../../styles/design";

import styles from "./ListingPost.module.scss";

export function ListingPostSkeleton(props) {
  const { seed } = props;
  return (
    <div className={styles.ListingPost}>
      <Inline spacing={s.l} vcentered>
        <Thumbnail width={110} height={110} seed={seed} />
        <Stack spacing={s.m}>
          <Skeleton width={210} height={f.l} />
          <Inline spacing={s.m}>
            <Skeleton width={50} height={f.l} />
            <Skeleton width={180} height={f.l} />
            <Skeleton width={70} height={f.l} />
          </Inline>
        </Stack>
      </Inline>
    </div>
  );
}

function ListingPost(props) {
  const { author, name, numComments, onClick, score, title, thumbnail } = props;
  return (
    <div className={styles.ListingPost}>
      <Clickable focusOnlyOnTab onClick={onClick}>
        <Inline spacing={s.l} vcentered>
          <Thumbnail src={thumbnail} width={110} height={110} seed={name} />
          <Stack spacing={s.m}>
            <Text className={styles.ListingPostTitle} size={f.l}>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </Text>
            <Text className={styles.ListingPostMeta} size={f.m}>
              {`${score} point${score === 1 ? "" : "s"}`}
              <span className={styles.ListingPostMetaDivider}> | </span>
              Posted by {author}
              <span className={styles.ListingPostMetaDivider}> | </span>
              {`${numComments} comment${numComments === 1 ? "" : "s"}`}
            </Text>
          </Stack>
        </Inline>
      </Clickable>
    </div>
  );
}

export default ListingPost;
