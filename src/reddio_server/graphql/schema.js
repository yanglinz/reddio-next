const _ = require('lodash');
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const { getTopSubreddits } = require('../services/reddit');

const POST_TYPE = 'PostType';

const POST_FIELDS = {
  name: 'name',
  url: 'url',
  author: 'author',
  title: 'title',
  score: 'score',
  ups: 'ups',
  numComments: 'num_comments',
  thumbnail: 'thumbnail',
  subreddit: 'subreddit'
};

function parsePostFields(resp) {
  return _.mapValues(POST_FIELDS, value => resp.data[value]);
}

const Post = new GraphQLObjectType({
  name: POST_TYPE,
  fields: {
    name: {
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
    numComments: {
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

function resolvePosts(source, args, context, info) {
  const {
    urlPath,
    sortType,
    sortRange,
    after,
    limit,
    includeStickied
  } = _.defaults(args, {
    limit: 25,
    includeStickied: false
  });

  return context.dataLoaders.subredditPosts
    .load({ urlPath, sortType, sortRange, after })
    .then(resp => resp.data.children)
    .then(posts =>
      _.filter(posts, post => includeStickied || !post.data.stickied))
    .then(posts => _.take(posts, limit))
    .then(posts => _.map(posts, parsePostFields));
}

const SUBREDDIT_TYPE = 'SubredditType';

const SUBREDDIT_FIELDS = {
  title: 'title',
  publicDescription: 'public_description',
  subscribers: 'subscribers'
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
  const { limit, includeStickied } = _.defaults(args, {
    limit: 25,
    includeStickied: false
  });
  const urlPath = source.urlPath;
  return context.dataLoaders.subredditPosts
    .load({ urlPath })
    .then(resp => resp.data.children)
    .then(posts =>
      _.filter(posts, post => includeStickied || !post.data.stickied))
    .then(posts => _.take(posts, limit))
    .then(posts => _.map(posts, parsePostFields));
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
    customDescription: {
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
    subscribers: {
      type: GraphQLInt,
      resolve: subredditFieldResolver('subscribers')
    },
    posts: {
      type: new GraphQLList(Post),
      args: {
        limit: {
          type: GraphQLInt
        },
        includeStickied: {
          type: GraphQLBoolean
        }
      },
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
    },
    posts: {
      type: new GraphQLList(Post),
      args: {
        urlPath: {
          type: GraphQLString
        },
        sortType: {
          type: GraphQLString
        },
        sortRange: {
          type: GraphQLString
        },
        after: {
          type: GraphQLString
        }
      },
      resolve: resolvePosts
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
