import RootProvider from './components/apollo';
import enhanceHomeTopSubredditQuery from './screens/home/top_subreddits_query';
import enhanceListingsQuery from './screens/listings/listings_query';

window.modules = {
  RootProvider,
  enhanceHomeTopSubredditQuery,
  enhanceListingsQuery
};
