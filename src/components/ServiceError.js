import React from "react";

import { Box, Stack, Text } from "../vendor/ui-system";
import { space as s, font as f } from "../styles/design";

import styles from "./ServiceError.module.scss";

function ServiceError() {
  return (
    <div className={styles.ServiceError}>
      <Box padding={s.x3l}>
        <Stack spacing={s.xl}>
          <Text className={styles.TextGraphic} size={240}>
            :(
          </Text>
          <Text className={styles.Text} size={f.xl}>
            Oops, something went wrong.
          </Text>
          <Text className={styles.Text} size={f.l}>
            Looks like we couldn't load your content.
          </Text>
        </Stack>
      </Box>
    </div>
  );
}

export default ServiceError;
