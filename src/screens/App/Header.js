import React from "react";
import Link from "next/link";

import LogoAnimation from "../../components/LogoAnimation";
import { Box, Inline, Stack } from "../../components/Spacing";
import * as Text from "../../components/Text";
import * as Layout from "../../components/Layout";

import styles from "./Header.module.scss";

function HeaderNav(props) {
  const { fullSize } = props;
  return (
    <Box spacing="m">
      <Link href="/">
        <a className={styles.HeaderNavBrand}>
          {fullSize ? (
            <LogoAnimation />
          ) : (
            <Inline spacing="s">
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
        <Stack spacing="xl">
          <Text.Heading2 className={styles.IntroSiteTitle} size="xxxl">
            Reddio
          </Text.Heading2>
          <Text.Heading2 className={styles.IntroTitle} size="xxl">
            Discover and listen to music.
          </Text.Heading2>
          <Text.Heading3 className={styles.IntroSubtitle} size="xl">
            Powered by hand curated content from reddit.
          </Text.Heading3>
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
