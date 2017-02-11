const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString
} = require('graphql');

const { getTopSubreddits } = require('../services/reddit');

const SUBREDDIT_TYPE = 'SubredditType';

const Subreddit = new GraphQLObjectType({
  name: SUBREDDIT_TYPE,
  fields: {
    id: { type: GraphQLID },
    slug: { type: GraphQLString },
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  }
});

const ROOT_QUERY_TYPE = 'RootQueryType';

function resolveTopSubreddits(source, args, context, info) {
  const subreddits = getTopSubreddits();
  return Promise.resolve(subreddits);
}

const RootQuery = new GraphQLObjectType({
  name: ROOT_QUERY_TYPE,
  fields: {
    topSubreddits: {
      type: new GraphQLList(Subreddit),
      resolve: resolveTopSubreddits
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
