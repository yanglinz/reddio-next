const graphqlByEnv = {
  "reddio.test": "https://reddio.test/api/graphql/",
  "reddio.co": "https://reddio-next.herokuapp.com/graphql/",
  fallback: "https://reddio.test/api/graphql/",
};

const config = {
  GRAPHQL_URI: graphqlByEnv[window.location.host] || graphqlByEnv.fallback,
  SC_CLIENT_ID: "cUa40O3Jg3Emvp6Tv4U6ymYYO50NUGpJ",
};

export default config;
