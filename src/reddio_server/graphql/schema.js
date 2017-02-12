const _ = require('lodash');
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

const POST_TYPE = 'PostType';

const Post = new GraphQLObjectType({
  name: POST_TYPE,
  fields: {
    id: {
      type: GraphQLID
    },
    url: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    score: {
      type: GraphQLInt
    },
    ups: {
      type: GraphQLInt
    },
    num_comments: {
      type: GraphQLInt
    },
    thumbnail: {
      type: GraphQLString
    },
    subreddit: {
      type: GraphQLString
    }
  }
});

const SUBREDDIT_TYPE = 'SubredditType';

const SUBREDDIT_FIELDS = {
  title: 'title',
  publicDescription: 'public_description',
  subscriberCount: 'subscribers'
};

function parseSubredditFields(resp) {
  return _.mapValues(SUBREDDIT_FIELDS, value => resp.data[value]);
}

function subredditFieldResolver(field) {
  return (source, args, context, info) => {
    const urlPath = source.urlPath;
    return context.dataLoaders.subredditInfo
      .load(urlPath)
      .then(parseSubredditFields)
      .then(data => data[field]);
  };
}

function resolveSubredditPosts(source, args, context, info) {
  const urlPath = source.urlPath;
  return context.dataLoaders.subredditPosts
    .load(urlPath)
    .then(resp => resp.data.children)
    .then(posts => _.map(posts, post => post.data));
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
      resolve: subredditFieldResolver('title')
    },
    publicDescription: {
      type: GraphQLString,
      resolve: subredditFieldResolver('publicDescription')
    },
    subscriberCount: {
      type: GraphQLInt,
      resolve: subredditFieldResolver('subscriberCount')
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: resolveSubredditPosts
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
