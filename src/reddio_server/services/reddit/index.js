const _ = require('lodash');
const Path = require('path');
const Url = require('url');
const Querystring = require('querystring');

const fetch = require('isomorphic-fetch');

const { SUBREDDITS } = require('./fixtures');

function getTopSubreddits() {
  return SUBREDDITS;
}

function getSubredditInfo(urlPath, params = {}) {
  const url = Url.resolve(
    'https://www.reddit.com',
    Path.join(urlPath, `about.json?${Querystring.stringify(params)}`)
  );
  return fetch(url).then(resp => resp.json());
}

function getSubredditPosts(urlPath, sortType = 'hot', params = {}) {
  const url = Url.resolve(
    'https://www.reddit.com',
    Path.join(urlPath, sortType, `.json?${Querystring.stringify(params)}`)
  );
  return fetch(url).then(resp => resp.json());
}

module.exports = {
  SUBREDDITS,
  getTopSubreddits,
  getSubredditInfo,
  getSubredditPosts
};
