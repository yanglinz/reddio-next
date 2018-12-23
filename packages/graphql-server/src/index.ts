import * as Hapi from "hapi";
import { ApolloServer } from "apollo-server-hapi";

import schema from "./graphql/schema";
// import dataLoaders from "./graphql/data-loaders";

async function start() {
  const app = new Hapi.Server({
    host: "localhost",
    port: process.env.PORT || 4000
  });
  const apollo = new ApolloServer({ schema });

  try {
    await apollo.applyMiddleware({ app });
    await apollo.installSubscriptionHandlers(app.listener);
    await app.start();
  } catch (err) {
    console.error(err);
  }
}

module.exports = { start };
