import * as Hapi from "hapi";
import { ApolloServer } from "apollo-server-hapi";

import schema from "./graphql/schema";
import createDataLoaders from "./graphql/data-loaders";

async function getResolverContext() {
  // Create dataloaders to cache responses within a single request
  return { dataLoaders: createDataLoaders() };
}

async function start() {
  const app = new Hapi.Server({
    host: "localhost",
    port: process.env.PORT || 4000
  });
  const apollo = new ApolloServer({
    schema,
    context: getResolverContext
  });

  try {
    await apollo.applyMiddleware({ app, path: "/graphql/", cors: true });
    await apollo.installSubscriptionHandlers(app.listener);
    await app.start();
  } catch (err) {
    console.error(err);
  }
}

export default start;
