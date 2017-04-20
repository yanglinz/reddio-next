const hapi = require('hapi');
const { graphqlHapi, graphiqlHapi } = require('graphql-server-hapi');

const rootSchema = require('./graphql/schema');
const dataLoaders = require('./graphql/data');
const settings = require('./settings');

function configureConnection(server) {
  server.connection({
    host: settings.SERVER_HOST,
    port: settings.SERVER_PORT
  });
}

function registerGraphql(server) {
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
}

function registerGraphiql(server) {
  server.register({
    register: graphiqlHapi,
    options: {
      path: '/graphiql/',
      graphiqlOptions: {
        endpointURL: '/graphql/'
      }
    }
  });
}

function start() {
  const server = new hapi.Server();
  configureConnection(server);
  registerGraphql(server);
  registerGraphiql(server);

  server.start(err => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
}

module.exports = { start };
