const _ = require('lodash');
const DataLoader = require('dataloader');

const { getSubredditInfo, getSubredditPosts } = require('../services/reddit');

function loadSubredditInfo(urlPaths) {
  const reqs = _.map(urlPaths, getSubredditInfo);
  return Promise.all(reqs);
}

function loadSubredditPosts(keys) {
  const reqs = _.map(keys, key => {
    const { urlPath, after } = key;
    return getSubredditPosts(urlPath, { after });
  });
  return Promise.all(reqs);
}

const dataLoaders = {
  subredditInfo: new DataLoader(loadSubredditInfo),
  subredditPosts: new DataLoader(loadSubredditPosts)
};

module.exports = dataLoaders;
