import React from "react";

import Summary from "./Summary";
import * as Layout from "../../components/Layout";
import * as data from "./data";

import styles from "./Explore.module.scss";

function Explore() {
  return (
    <Layout.Standard>
      <div className={styles.Explore}>
        <Summary title="Electronic" listings={data.byGenre.electronic} />
        <Summary title="Rock / Alternative" listings={data.byGenre.rock} />
        <Summary title="Hip-Hop" listings={data.byGenre.hiphop} />
        <Summary title="Classical" listings={data.byGenre.classical} />
      </div>
    </Layout.Standard>
  );
}

export default Explore;
