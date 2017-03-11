import RootProvider from './components/apollo';
import enhanceHomeTopSubredditQuery from './screens/home/top_subreddits.interop';
import enhanceListingsQuery from './screens/listings/listings.interop';

window.modules = {
  RootProvider,
  enhanceHomeTopSubredditQuery,
  enhanceListingsQuery
};
