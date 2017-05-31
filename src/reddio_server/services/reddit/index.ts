import * as Path from "path";
import * as Querystring from "querystring";
import * as Url from "url";

import * as _ from "lodash";
import * as fetch from "isomorphic-fetch";

type ListingKind = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

export interface ListingPost {
  kind: ListingKind;
  data: {
    subreddit: string,
    selftext_html: string,
    score: number;
    author: string;
    name: string;
    domain: string;
    secure_media: any;
    thumbnail?: string;
    permalink: string;
    title: string;
    url: string;
    num_comments: number;
    ups: number;
  };
}

export interface Listing {
  kind: ListingKind;
  data: {
    children: ListingPost[]
  };
}

export interface SubredditInfo {
  kind: ListingKind;
  data: {
    display_name: string;
    description_html: string;
    header_title: string;
    subscribers: number;
    title: string;
  };
}

export interface MultiredditInfo {
  kind: ListingKind;
  data: {
    display_name: string;
    description_html: string;
    subreddits: any[];
  };
}

interface ListingParams {
  after?: string;
  before?: string;
  count?: number;
  limit?: number;
}

export function isSubreddit(pathname: string) {
  const parts = _.compact(pathname.split('/'));
  const [r, ...rest] = parts;
  return !isCommentThread(pathname) && parts.length >= 2 && r === 'r';
}

export function isMultireddit(pathname: string) {
  const parts = _.compact(pathname.split('/'));
  const [u, user, m, ...rest] = parts;
  return parts.length >= 4 && u === 'user' && m === 'm';
}

export function isCommentThread(pathname: string) {
  const parts = _.compact(pathname.split('/'));
  const [r, sub, c, id, ...rest] = parts;
  return parts.length >= 5 && r === 'r' && c === 'comments';
}

export function parsePostThumbnail(post: ListingPost) {
  const { thumbnail } = post.data;
  return post.data.thumbnail || _.get(post.data, "media.oembed.thumbnail_url");
}

const LISTING_TYPES = [
  "hot",
  "new",
  "rising",
  "top",
];

export function getRootPathname(pathname: string) {
  const parsed = Url.parse(pathname);
  const trimmed = _.trimEnd(parsed.pathname, "/");
  const fragments = trimmed.split("/");
  const modifiedFragments = _.includes(LISTING_TYPES, _.last(fragments))
    ? _.slice(fragments, 0, fragments.length - 1)
    : fragments;
  return modifiedFragments.join("/");
}

export function getListing(pathname: string, qs: ListingParams = {}) {
  const parsed = Url.parse(pathname);
  const parsedQs = Querystring.parse(parsed.query);
  const url = Url.resolve(
    "https://www.reddit.com",
    Path.join(parsed.pathname, `.json?${Querystring.stringify(_.extend(qs, parsedQs))}`),
  );

  return fetch(url).then((resp) => resp.json());
}

export function getSubredditInfo(pathname: string) {
  const rootPathname = getRootPathname(pathname);
  const url = Url.resolve(
    "https://www.reddit.com",
    Path.join(rootPathname, `about.json`),
  );
  return fetch(url).then((resp) => resp.json());
}

export function getMultiredditInfo(pathname: string) {
  const rootPathname = getRootPathname(pathname);
  const url = Url.resolve(
    "https://www.reddit.com/api/multi",
    Path.join(rootPathname, `.json`),
  );
  return fetch(url).then((resp) => resp.json());
}
