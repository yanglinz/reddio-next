import RootProvider from "./apollo";
import enhanceListingsQuery from "./screens/listings/listings.interop";
import enhanceHomeTopSubredditQuery from "./screens/home/top_subreddits.interop";
import settings from "./settings";

window.modules = {
  RootProvider,
  enhanceListingsQuery,
  enhanceHomeTopSubredditQuery,
  settings,
};
