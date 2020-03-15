import { ApolloServer, gql } from "apollo-server-micro";

import schema from "../../src/server/graphql/schema";
import createDataLoaders from "../../src/server/graphql/data-loaders";

const apolloServer = new ApolloServer({
  schema: schema,
  context: () => {
    return { dataloaders: createDataLoaders() };
  }
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
