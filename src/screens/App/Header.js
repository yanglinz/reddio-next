import React from "react";
import Link from "next/link";

import { Box, Inline, Stack, Text } from "../../vendor/ui-system";
import LogoAnimation from "../../components/LogoAnimation";
import * as Layout from "../../components/Layout";
import * as design from "../../styles/design";

import styles from "./Header.module.scss";

function HeaderNav(props) {
  const { fullSize } = props;
  return (
    <Box padding={design.space.m}>
      <Link href="/">
        <a className={styles.HeaderNavBrand}>
          {fullSize ? (
            <LogoAnimation />
          ) : (
            <Inline spacing={design.space.s} vcentered>
              <LogoAnimation />
              <span className={styles.HeaderNavDivider}></span>
              <span className={styles.HeaderNavTitle}>Reddio</span>
            </Inline>
          )}
        </a>
      </Link>
    </Box>
  );
}

function HeaderIntro() {
  return (
    <div className={styles.Intro}>
      <Layout.Wide>
        <Stack spacing={design.space.xl}>
          <Text className={styles.IntroSiteTitle} size={67}>
            Reddio
          </Text>
          <Text className={styles.IntroTitle} size={42}>
            Discover and listen to music.
          </Text>
          <Text className={styles.IntroSubtitle} size={26}>
            Powered by hand curated content from reddit.
          </Text>
        </Stack>
      </Layout.Wide>
    </div>
  );
}

export function Header(props) {
  const { fullSize } = props;
  return (
    <div className={styles.Header}>
      <HeaderNav fullSize={fullSize} />
      {fullSize ? <HeaderIntro /> : null}
    </div>
  );
}

export default Header;
