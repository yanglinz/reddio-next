import { ApolloServer, gql } from "apollo-server-micro";

import schema from "../../server/graphql/schema";
import createDataLoaders from "../../server/graphql/data-loaders";

const apolloServer = new ApolloServer({
  schema: schema,
  context: () => {
    return { dataLoaders: createDataLoaders() };
  }
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
