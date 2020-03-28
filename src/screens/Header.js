import React from "react";
import Link from "next/link";

import { Box } from "../components/Spacing";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <div className={styles.Header}>
      <Box spacing="m">
        <Link href="/">
          <a className={styles.SiteTitle}>
            <span className={styles.Accent1}>Reddio</span>
            <span> </span>
            <span className={styles.Accent2}>Player</span>
          </a>
        </Link>
      </Box>
    </div>
  );
}

export default Header;
