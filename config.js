const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const {
  PORT,
  HOST
} = _.defaults(process.env, {
  PORT: '4000',
  HOST: 'localhost'
});

module.exports = {
  PORT,
  HOST
};
