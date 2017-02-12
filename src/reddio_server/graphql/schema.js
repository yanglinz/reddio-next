const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const { getTopSubreddits } = require('../services/reddit');

const SUBREDDIT_TYPE = 'SubredditType';

function resolveSubredditTitle(source, args, context, info) {
  const urlPath = source.urlPath;
  return context.dataLoaders.subredditInfo
    .load(urlPath)
    .then(resp => resp.data.title);
}

function resolveSubredditPublicDescription(source, args, context, info) {
  const urlPath = source.urlPath;
  return context.dataLoaders.subredditInfo
    .load(urlPath)
    .then(resp => resp.data.public_description);
}

function resolveSubredditSubscriberCount(source, args, context, info) {
  const urlPath = source.urlPath;
  return context.dataLoaders.subredditInfo
    .load(urlPath)
    .then(resp => resp.data.subscribers);
}

const Subreddit = new GraphQLObjectType({
  name: SUBREDDIT_TYPE,
  fields: {
    id: {
      type: GraphQLID
    },
    displayName: {
      type: GraphQLString
    },
    urlPath: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString,
      resolve: resolveSubredditTitle
    },
    publicDescription: {
      type: GraphQLString,
      resolve: resolveSubredditPublicDescription
    },
    subscriberCount: {
      type: GraphQLInt,
      resolve: resolveSubredditSubscriberCount
    }
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
