const Path = require('path');
const Url = require('url');

const fetch = require('isomorphic-fetch');

const { SUBREDDITS } = require('./fixtures');

function getTopSubreddits() {
  return SUBREDDITS;
}

function getSubredditInfo(urlPath) {
  const url = Url.resolve(
    'https://www.reddit.com',
    Path.join(urlPath, 'about.json')
  );
  return fetch(url).then(resp => resp.json());
}

function getSubredditPosts(urlPath) {
  const url = Url.resolve(
    'https://www.reddit.com',
    Path.join(urlPath, '.json')
  );
  return fetch(url).then(resp => resp.json());
}

module.exports = {
  SUBREDDITS,
  getTopSubreddits,
  getSubredditInfo,
  getSubredditPosts
};
