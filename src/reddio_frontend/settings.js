const graphqlByEnv = {
  "reddio.test": "https://reddio.test/api/graphql/",
  "reddio.co": "https://reddio-next.herokuapp.com/graphql/",
  fallback: "https://reddio.test/api/graphql/",
};

const config = {
  GRAPHQL_URI: graphqlByEnv[window.location.host] || graphqlByEnv.fallback,
  SC_CLIENT_ID: "ubStmLVqKyHd2R4DLingkQjSSXlsgq6D",
};

export default config;
