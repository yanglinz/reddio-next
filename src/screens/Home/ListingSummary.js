import React from "react";
import Link from "next/link";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import uniqBy from "lodash/uniqBy";

import { Box, Stack, Text } from "../../vendor/ui-system";
import Thumbnail from "../../components/Thumbnail";
import Skeleton from "../../components/Skeleton";
import { font as f, space as s } from "../../styles/design";

import styles from "./ListingSummary.module.scss";

function Empty() {
  return <div style={{ height: 20 }}></div>;
}

export function ListingSummarySkeleton() {
  return (
    <div className={styles.Summary}>
      <Skeleton width={300} height={60} />

      <Box padding={s.l}>
        <Stack spacing={s.l}>
          <Skeleton width={140} height={f.l} />
          <Skeleton width={220} height={f.xl} />
        </Stack>
        <Empty />
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

      <Box padding={s.l}>
        <Stack spacing={s.l}>
          <Text className={styles.TitleText} size={f.l}>
            <Link href="[...resolver]" as={pathname}>
              <a>{pathname}</a>
            </Link>
          </Text>

          <Text className={styles.DescriptionText} size={f.s}>
            {description}
          </Text>
        </Stack>
        <Empty />
      </Box>
    </div>
  );
}

export default ListingSummary;
