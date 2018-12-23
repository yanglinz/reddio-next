const graphqlByEnv = {
  "reddio.test": "https://reddio.test/api/graphql/",
  fallback:
    "https://mgbatrhrd1.execute-api.us-east-1.amazonaws.com/dev/graphql/"
};

const config = {
  GRAPHQL_URI: graphqlByEnv[window.location.host] || graphqlByEnv.fallback,
  SC_CLIENT_ID: "ubStmLVqKyHd2R4DLingkQjSSXlsgq6D"
};

export default config;
