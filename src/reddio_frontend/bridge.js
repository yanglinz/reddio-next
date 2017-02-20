import RootProvider from './components/apollo';
import enhanceHomeTopSubredditQuery from './screens/home/top-subreddits';
import enhanceListingsQuery from './screens/listings/listings';

window.modules = {
  RootProvider,
  enhanceHomeTopSubredditQuery,
  enhanceListingsQuery
};
