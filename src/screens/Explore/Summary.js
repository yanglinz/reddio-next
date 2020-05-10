import React from "react";
import Link from "next/link";

import { Box, Text } from "../../vendor/ui-system";
import * as design from "../../styles/design";

import styles from "./Summary.module.scss";

function Summary(props) {
  const { title, listings } = props;

  return (
    <div className={styles.Summary}>
      <div className={styles.Title}>
        <Box padding={design.space.l}>
          <Text className={styles.TitleText} size={design.font.m}>
            {title}
          </Text>
        </Box>
      </div>
      {listings.map(listing => (
        <div key={listing} className={styles.Listing}>
          <Box padding={design.space.l}>
            <Text size={design.font.m}>
              <Link href="[...resolver]" as={listing}>
                <a>{listing}</a>
              </Link>
            </Text>
          </Box>
        </div>
      ))}
    </div>
  );
}

export default Summary;
