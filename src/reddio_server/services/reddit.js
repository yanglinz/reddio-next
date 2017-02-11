const SUBREDDITS = [
  {
    'id': '/r/listentothis',
    'slug': 'listentothis',
    'name': 'listentothis',
    'url': 'https://www.reddit.com/r/listentothis/'
  }
]

function getTopSubreddits() {
  return SUBREDDITS;
}

module.exports = {
  SUBREDDITS,
  getTopSubreddits
};
