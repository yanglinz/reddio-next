import React from "react";

import { Box, Stack, Text } from "../../vendor/ui-system";
import Skeleton from "../../components/Skeleton";
import * as reddit from "../../lib/reddit";
import { space as s, font as f } from "../../styles/design";

import styles from "./ListingHeader.module.scss";

function ListingHeader(props) {
  const { pathname, info } = props;

  let subscribers = "";
  const infoType = info && info.__typename;
  if (infoType === "ListingSubredditInfo") {
    const subscriberCount = (info.info && info.info.subscribers) || 0;
    subscribers =
      subscribers === 1
        ? "1 subscriber"
        : `${subscriberCount.toLocaleString()} subscribers`;
  }

  return (
    <div className={styles.ListingHeader}>
      <Box padding={s.m}>
        <Stack spacing={s.m}>
          <Text className={styles.ListingName} size={f.s}>
            {reddit.getCleanedPathname(pathname)}
          </Text>
          {subscribers ? (
            <Text className={styles.ListingMeta} size={f.s}>
              {subscribers}
            </Text>
          ) : (
            <Skeleton width={115} height={f.s - 2} />
          )}
        </Stack>
      </Box>
    </div>
  );
}

export default ListingHeader;
