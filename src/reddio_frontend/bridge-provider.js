import RootProvider from './components/apollo';
import enhanceHomeTopSubredditQuery from './screens/home/top-subreddits-query';
import enhanceListingsQuery from './screens/listings/listings-query';

window.modules = {
  RootProvider,
  enhanceHomeTopSubredditQuery,
  enhanceListingsQuery
};
