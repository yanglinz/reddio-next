const hapi = require('hapi');
const { graphqlHapi, graphiqlHapi } = require('graphql-server-hapi');

const rootSchema = require('./graphql/schema');
const dataLoaders = require('./graphql/data');
const config = require('../../config');

const server = new hapi.Server();

server.connection({
  host: config.HOST,
  port: config.PORT
});

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql/',
    graphqlOptions: {
      schema: rootSchema,
      context: { dataLoaders }
    },
    route: {
      cors: true
    }
  }
});

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql/',
    graphiqlOptions: {
      endpointURL: '/graphql/'
    }
  }
});

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
