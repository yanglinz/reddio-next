import { graphql,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import * as _ from "lodash";

import * as r from "../services/reddit";
import { Listing, ListingInfo, ListingPost } from "../services/reddit";
import { CUSTOM_METADATA, TOP_SUBREDDITS } from "../services/reddit/custom-sets";

export function postToPostType(post: ListingPost) {
  return {
    author: post.data.author,
    name: post.data.name,
    numComments: post.data.num_comments,
    score: post.data.score,
    thumbnail: r.parsePostThumbnail(post),
    title: post.data.title,
    ups: post.data.ups,
    url: post.data.url,
  };
}

export function infoToListingInfoType(info: ListingInfo) {
  return {
    title: info.data.display_name,
  };
}

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    author: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLID,
    },
    numComments: {
      type: GraphQLInt,
    },
    score: {
      type: GraphQLInt,
    },
    thumbnail: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    ups: {
      type: GraphQLInt,
    },
    url: {
      type: GraphQLString,
    },
  },
});

const ListingInfoType = new GraphQLObjectType({
  name: "ListingInfo",
  fields: {
    title: {
      type: GraphQLString,
    },
  },
});

const ListingCustomInfoType = new GraphQLObjectType({
  name: "ListingCustomInfoType",
  fields: {
    pathname: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const metadata = CUSTOM_METADATA[pathname] || {};
        return metadata.description;
      },
    },
  },
});

const ListingType = new GraphQLObjectType({
  name: "Listing",
  fields: {
    pathname: {
      type: GraphQLString,
    },
    info: {
      type: ListingInfoType,
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const { subredditInfo, multiredditInfo } = context.dataLoaders;
        const loader = (
          (r.isSubreddit(pathname) && subredditInfo) ||
          (r.isMultireddit(pathname) && multiredditInfo)
        );
        return loader.load(pathname)
          .then(infoToListingInfoType);
      },
    },
    customInfo: {
      type: ListingCustomInfoType,
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        return { pathname };
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        sortType: {
          type: GraphQLString,
        },
        sortRange: {
          type: GraphQLString,
        },
        after: {
          type: GraphQLString,
        },
        limit: {
          type: GraphQLInt,
        },
      },
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const { sortType, sortRange, after, limit } = args;
        const loader = context.dataLoaders.listing;
        return loader.load({ pathname, sortType, sortRange, after, limit })
          .then((listing: Listing) => _.map(listing.data.children, postToPostType));
      },
    },
  },
});

const ListingSetType = new GraphQLObjectType({
  name: "ListingSet",
  fields: {
    pathnames: {
      type: new GraphQLList(GraphQLString),
    },
    listings: {
      type: new GraphQLList(ListingType),
      resolve: (source, args, context, info) => {
        const { pathnames } = source;
        return _.map(pathnames, (pathname) => ({ pathname }));
      },
    },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    listing: {
      type: ListingType,
      args: {
        pathname: {
          type: GraphQLString,
        },
      },
      resolve: (source, args, context, info) => {
        const { pathname } = args;
        return { pathname };
      },
    },
    topSubreddits: {
      type: ListingSetType,
      resolve: (source, args, context, info) => {
        return { pathnames: TOP_SUBREDDITS };
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

export default schema;
