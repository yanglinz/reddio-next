import { graphiqlHapi, graphqlHapi } from "graphql-server-hapi";
import * as Hapi from "hapi";

import rootSchema from "./graphql/schema";
import dataLoaders from "./graphql/data-loaders";

function configureConnection(server) {
  server.connection({
    port: process.env.PORT || 4000,
  });
}

function registerGraphql(server) {
  server.register({
    register: graphqlHapi,
    options: {
      path: "/graphql/",
      graphqlOptions: {
        schema: rootSchema,
        context: { dataLoaders },
      },
      route: {
        cors: true,
      },
    },
  });
}

function registerGraphiql(server) {
  server.register({
    register: graphiqlHapi,
    options: {
      path: "/graphiql/",
      graphiqlOptions: {
        endpointURL: "/graphql/",
      },
    },
  });
}

function start() {
  const server = new Hapi.Server();
  configureConnection(server);
  registerGraphql(server);
  registerGraphiql(server);

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
}

module.exports = { start };
