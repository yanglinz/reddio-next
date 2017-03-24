const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const {
  NODE_ENV,
  PROTOCOL,
  PORT
} = _.defaults(process.env, {
  PROTOCOL: 'http',
  PORT: '4000'
});

const IS_PROD = NODE_ENV === 'production';
const IS_DEV = !IS_PROD;
const HOST = IS_PROD ? '0.0.0.0' : 'localhost';

module.exports = {
  IS_PROD,
  IS_DEV,
  PROTOCOL,
  HOST,
  PORT
};
