import RootProvider from './components/apollo';
import enhanceListingsQuery from './screens/listings/listings.interop';
import enhanceHomeTopSubredditQuery
  from './screens/home/top_subreddits.interop';

window.modules = {
  RootProvider,
  enhanceListingsQuery,
  enhanceHomeTopSubredditQuery,
};
