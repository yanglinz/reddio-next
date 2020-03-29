import React from "react";
import Link from "next/link";

import { Box } from "../../components/Spacing";
import * as Text from "../../components/Text";

import styles from "./Summary.module.scss";

function Summary(props) {
  const { title, listings } = props;

  return (
    <div className={styles.Summary}>
      <div className={styles.Title}>
        <Box spacing="m">
          <Text.Text className={styles.TitleText} size="m">
            {title}
          </Text.Text>
        </Box>
      </div>
      {listings.map(listing => (
        <div key={listing} className={styles.Listing}>
          <Box spacing="m">
            <Text.Text size="m">
              <Link href="[...resolver]" as={listing}>
                <a>{listing}</a>
              </Link>
            </Text.Text>
          </Box>
        </div>
      ))}
    </div>
  );
}

export default Summary;
