import React from "react";
import { Provider } from "react-redux";

import Player from "../src/screens/Player/Player";
import store from "../src/store/store";

import "../src/index.css";

export default function Application({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Player />
    </Provider>
  );
}
