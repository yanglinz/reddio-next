const _ = require("lodash");
const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV,
  PORT,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_PROTOCOL,
  FRONTEND_GRAPHQL_URI,
  FRONTEND_SC_CLIENT_ID
} = process.env;

const IS_PROD = NODE_ENV === "production";
const IS_DEV = !IS_PROD;

module.exports = {
  IS_PROD,
  IS_DEV,
  NODE_ENV,
  SERVER_HOST,
  SERVER_PORT: SERVER_PORT || PORT,
  SERVER_PROTOCOL,
  FRONTEND_GRAPHQL_URI,
  FRONTEND_SC_CLIENT_ID
};
