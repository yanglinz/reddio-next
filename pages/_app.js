import React from "react";
import { Provider } from "react-redux";
import Head from "next/head";

import Player from "../src/screens/Player/Player";
import store from "../src/store/store";

import "../src/styles/global.css";
import "../src/styles/player.css";

export default function Application({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Reddio</title>
      </Head>
      <Component {...pageProps} />
      <Player />
    </Provider>
  );
}
