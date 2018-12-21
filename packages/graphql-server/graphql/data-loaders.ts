import * as DataLoader from "dataloader";
import * as _ from "lodash";

import * as r from "../services/reddit";

function loadSubredditInfo(pathnames: string[]) {
  const reqs = _.map(pathnames, r.getSubredditInfo);
  return Promise.all(reqs);
}

function loadMultiredditInfo(pathnames: string[]) {
  const reqs = _.map(pathnames, r.getMultiredditInfo);
  return Promise.all(reqs);
}

function loadListing(keys: any[]) {
  const reqs = _.map(keys, key => {
    const { pathname, after, limit } = key;
    return r.getListing(pathname, { after, limit });
  });
  return Promise.all(reqs);
}

const dataLoaders = {
  listing: new DataLoader(loadListing),
  subredditInfo: new DataLoader(loadSubredditInfo),
  multiredditInfo: new DataLoader(loadMultiredditInfo),
};

export default dataLoaders;
