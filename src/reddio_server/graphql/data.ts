import * as DataLoader from "dataloader";
import * as _ from "lodash";

import { getSubredditInfo, getSubredditPosts } from "../services/reddit";

function loadSubredditInfo(urlPaths: string[]) {
  const reqs = _.map(urlPaths, getSubredditInfo);
  return Promise.all(reqs);
}

function loadSubredditPosts(keys: any[]) {
  const reqs = _.map(keys, (key) => {
    const { urlPath, sortType, sortRange, after } = key;
    return getSubredditPosts(urlPath, sortType, { after, t: sortRange });
  });
  return Promise.all(reqs);
}

const dataLoaders = {
  subredditInfo: new DataLoader(loadSubredditInfo),
  subredditPosts: new DataLoader(loadSubredditPosts),
};

export default dataLoaders;
