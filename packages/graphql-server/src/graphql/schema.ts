import {
  graphql,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType
} from "graphql";
import * as _ from "lodash";

import * as r from "../services/reddit";
import {
  Listing,
  ListingPost,
  MultiredditInfo,
  SubredditInfo
} from "../services/reddit";
import {
  CUSTOM_METADATA,
  TOP_SUBREDDITS
} from "../services/reddit/custom-sets";

export function postToPostType(post: ListingPost) {
  return {
    author: post.data.author,
    name: post.data.name,
    numComments: post.data.num_comments,
    score: post.data.score,
    thumbnail: r.parsePostThumbnail(post),
    title: post.data.title,
    ups: post.data.ups,
    url: post.data.url
  };
}

export function subredditInfoToListingSubInfoType(info: SubredditInfo) {
  return {
    displayName: info.data.display_name,
    description: info.data.description_html,
    headerTitle: info.data.header_title,
    subscribers: info.data.subscribers,
    title: info.data.display_name
  };
}

export function multiredditInfoToListingSubInfoType(info: MultiredditInfo) {
  return {
    displayName: info.data.display_name,
    description: info.data.description_html,
    subredditCount: info.data.subreddits.length
  };
}

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    author: {
      type: GraphQLString
    },
    name: {
      type: GraphQLID
    },
    numComments: {
      type: GraphQLInt
    },
    score: {
      type: GraphQLInt
    },
    thumbnail: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    ups: {
      type: GraphQLInt
    },
    url: {
      type: GraphQLString
    }
  }
});

const ListingSubredditInfoType = new GraphQLObjectType({
  name: "ListingSubredditInfo",
  fields: {
    pathname: {
      type: GraphQLString
    },
    info: {
      type: new GraphQLObjectType({
        name: "ListingSubredditSubInfo",
        fields: {
          displayName: {
            type: GraphQLString
          },
          description: {
            type: GraphQLString
          },
          headerTitle: {
            type: GraphQLString
          },
          subscribers: {
            type: GraphQLInt
          },
          title: {
            type: GraphQLString
          }
        }
      }),
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const loader = context.dataLoaders.subredditInfo;
        return loader.load(pathname).then(subredditInfoToListingSubInfoType);
      }
    }
  }
});

const ListingMultiredditInfoType = new GraphQLObjectType({
  name: "ListingMultiredditInfo",
  fields: {
    pathname: {
      type: GraphQLString
    },
    info: {
      type: new GraphQLObjectType({
        name: "ListingMultiredditSubInfo",
        fields: {
          displayName: {
            type: GraphQLString
          },
          description: {
            type: GraphQLString
          },
          subredditCount: {
            type: GraphQLInt
          }
        }
      }),
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const loader = context.dataLoaders.multiredditInfo;
        return loader.load(pathname).then(multiredditInfoToListingSubInfoType);
      }
    }
  }
});

const ListingInfoType = new GraphQLUnionType({
  name: "ListingInfo",
  types: [ListingSubredditInfoType, ListingMultiredditInfoType],
  resolveType: ({ pathname }) => {
    return (
      (r.isSubreddit(pathname) && ListingSubredditInfoType) ||
      (r.isMultireddit(pathname) && ListingMultiredditInfoType)
    );
  }
});

const ListingCustomInfoType = new GraphQLObjectType({
  name: "ListingCustomInfoType",
  fields: {
    pathname: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString,
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const metadata = CUSTOM_METADATA[pathname] || {};
        return metadata.description;
      }
    }
  }
});

const ListingType = new GraphQLObjectType({
  name: "Listing",
  fields: {
    pathname: {
      type: GraphQLString
    },
    info: {
      type: ListingInfoType,
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        return { pathname };
      }
    },
    customInfo: {
      type: ListingCustomInfoType,
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        return { pathname };
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        after: {
          type: GraphQLString
        },
        limit: {
          type: GraphQLInt
        }
      },
      resolve: (source, args, context, info) => {
        const { pathname } = source;
        const { after, limit } = args;
        const loader = context.dataLoaders.listing;
        return loader
          .load({ pathname, after, limit })
          .then((listing: Listing) =>
            _.map(listing.data.children, postToPostType)
          );
      }
    }
  }
});

const ListingSetType = new GraphQLObjectType({
  name: "ListingSet",
  fields: {
    pathnames: {
      type: new GraphQLList(GraphQLString)
    },
    listings: {
      type: new GraphQLList(ListingType),
      resolve: (source, args, context, info) => {
        const { pathnames } = source;
        return _.map(pathnames, pathname => ({ pathname }));
      }
    }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    listing: {
      type: ListingType,
      args: {
        pathname: {
          type: GraphQLString
        }
      },
      resolve: (source, args, context, info) => {
        const { pathname } = args;
        return { pathname };
      }
    },
    topSubreddits: {
      type: ListingSetType,
      resolve: (source, args, context, info) => {
        return { pathnames: TOP_SUBREDDITS };
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

export default schema;
