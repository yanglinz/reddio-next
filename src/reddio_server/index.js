import hapi from 'hapi';
import { graphqlHapi } from 'graphql-server-hapi';

const server = new hapi.Server();

const HOST = 'localhost';
const PORT = 3000;

server.connection({
  host: HOST,
  port: PORT,
});

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: {
      schema: myGraphQLSchema,
    },
    route: {
      cors: true
    }
  },
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
