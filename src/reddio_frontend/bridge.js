import RootProvider from './components/apollo';
import enhanceHomeTopSubredditQuery from './screens/home/top-subreddits';

window.modules = {
  RootProvider,
  enhanceHomeTopSubredditQuery
};
