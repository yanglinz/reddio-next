import * as Path from "path";
import * as Querystring from "querystring";
import * as Url from "url";

import * as fetch from "isomorphic-fetch";
import * as _ from "lodash";

import { SUBREDDITS } from "./fixtures";

export function getTopSubreddits() {
  return SUBREDDITS;
}

export function getSubredditInfo(urlPath: string, params = {}) {
  const url = Url.resolve(
    "https://www.reddit.com",
    Path.join(urlPath, `about.json?${Querystring.stringify(params)}`),
  );
  return fetch(url).then((resp) => resp.json());
}

export function getSubredditPosts(urlPath: string, sortType = "hot", params = {}) {
  const url = Url.resolve(
    "https://www.reddit.com",
    Path.join(urlPath, sortType, `.json?${Querystring.stringify(params)}`),
  );
  return fetch(url).then((resp) => resp.json());
}
