const _ = require('lodash');
const DataLoader = require('dataloader');

const { getSubredditInfo } = require('../services/reddit');

function loadSubredditInfo(urlPaths) {
  const reqs = _.map(urlPaths, getSubredditInfo);
  return Promise.all(reqs);
}

const dataLoaders = {
  subredditInfo: new DataLoader(loadSubredditInfo),
  subredditPosts: {}
};

module.exports = dataLoaders;
