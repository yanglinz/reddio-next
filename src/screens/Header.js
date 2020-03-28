import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native-web";
import Link from "next/link";
import Router from "next/router";

import { Box } from "../components/Spacing";
import * as design from "../design";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <div className={styles.Header}>
      <Box>
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

const stylesLegacy = StyleSheet.create({
  branding: {
    flexDirection: "row",
    alignItems: "center"
  },
  siteName: {
    color: design.colors.primary.c4,
    fontSize: design.fontSize.larger2
  },
  siteNameAccent: {
    color: design.colors.neutral.c5,
    fontSize: design.fontSize.larger2
  }
});

export default Header;
