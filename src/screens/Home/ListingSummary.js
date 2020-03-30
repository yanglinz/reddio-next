import React from "react";
import Link from "next/link";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import uniqBy from "lodash/uniqBy";

import Thumbnail from "../../components/Thumbnail";
import Skeleton from "../../components/Skeleton";
import { Box, Stack, Empty } from "../../components/Spacing";
import * as TextNext from "../../components/Text";
import * as design from "../../design";

import styles from "./ListingSummary.module.scss";

export function ListingSummarySkeleton() {
  return (
    <div className={styles.Summary}>
      <Skeleton width={300} height={60} />

      <Box spacing="m">
        <Stack spacing="s">
          <Skeleton width={140} height={design.fontSize.large} />
          <Skeleton width={220} height={design.fontSize.larger2} />
        </Stack>
        <Empty spacing="m" />
      </Box>
    </div>
  );
}

export function ListingSummary(props) {
  const { pathname, posts, customInfo } = props;
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
    <div className={styles.Summary}>
      <div className={styles.Images}>
        {thumbnailPosts.map(p => (
          <div key={p.name}>
            <Thumbnail
              title={p.title}
              width={60}
              height={60}
              src={p.thumbnail}
              seed={p.name}
            />
          </div>
        ))}
      </div>

      <Box spacing="m">
        <Stack spacing="m">
          <TextNext.Text className={styles.TitleText} size="l">
            <Link href="[...resolver]" as={pathname}>
              <a>{pathname}</a>
            </Link>
          </TextNext.Text>

          <TextNext.Text className={styles.DescriptionText} size="s">
            {description}
          </TextNext.Text>
        </Stack>
        <Empty spacing="m" />
      </Box>
    </div>
  );
}

export default ListingSummary;
