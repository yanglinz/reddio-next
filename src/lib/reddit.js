import * as Qs from "qs";
import first from "lodash/first";
import last from "lodash/last";
import dropRight from "lodash/dropRight";
import zipObject from "lodash/zipObject";

const sources = [
  "youtu.be",
  "www.youtu.be",
  "youtube.com",
  "www.youtube.com",
  "soundcloud.com",
  "www.soundcloud.com"
];

const playableSources = zipObject(sources, sources);

export function isPostPlayable(postUrl) {
  let host;
  try {
    host = new URL(postUrl).host;
  } catch (e) {
    return false;
  }
  return Boolean(playableSources[host]);
}

export function getCleanedPathname(pathname) {
  const pathParts = pathname.split("/");
  if (pathParts[1] === "r") {
    const [slash, r, subreddit] = pathParts;
    return [slash, r, subreddit].join("/");
  }

  return pathname;
}

export const sortTypes = {
  hot: "hot",
  top: "top",
  new: "new",
  controversial: "controversial",
  rising: "rising"
};

export const sortRanges = {
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  year: "year",
  all: "all"
};

function naiveUrlParser(path) {
  let [pathname, search, ..._] = path.split("?");
  search = search || "";
  return { pathname, search };
}

function naiveUrlFormatter(parsed) {
  const { pathname, search } = parsed;
  if (search) {
    return [pathname, search].join("?");
  }
  return pathname;
}

export function getSortType(path) {
  const { pathname } = naiveUrlParser(path);
  if (pathname === "/") {
    return sortTypes.hot;
  }

  const pathParts = pathname.split("/");
  const namedParts = pathParts.filter(Boolean);
  const lastPart = last(namedParts);

  if (sortTypes[lastPart.toLowerCase()]) {
    return sortTypes[lastPart.toLowerCase()];
  }

  // Return the default sortType of hot if we don't know
  return sortTypes.hot;
}

export function getSortRange(path) {
  const search = path.split("?")[1];
  const params = Qs.parse(search);
  return params.t || sortRanges.day;
}

// TODO: Test this function generatively
export function resolveSortTypePath(path, newSort) {
  const { pathname, search } = naiveUrlParser(path);

  // Depending on if we're on a subreddit or a multireddit
  // We could have differing number of parts in our path.
  const pathParts = pathname.split("/");
  const pathNamedParts = pathParts.filter(Boolean);

  // Handle root case, where currently the user is at the root path
  const atRoot = pathNamedParts.length <= 1;
  if (atRoot) {
    if (pathname === "/" && newSort === "hot") {
      return naiveUrlFormatter({ pathname, search });
    }

    const newPathname = `/${newSort}`;
    return naiveUrlFormatter({ pathname: newPathname, search });
  }

  // Handle subreddits and multireddits
  // If we're at the root and we're trying to navigate to a hot sort type
  // We want to preserve the existing path instead of tacking on /hot
  const atListingRoot =
    first(pathNamedParts) === "r" && pathNamedParts.length === 2;
  if (atListingRoot && newSort === "hot") {
    return naiveUrlFormatter({ pathname, search });
  }

  const hasSortType = sortTypes[last(pathNamedParts)];
  let newParts;
  if (hasSortType) {
    newParts = dropRight(pathParts).concat(newSort);
  } else {
    newParts = pathParts.concat(newSort);
  }

  const newPathname = newParts.join("/");
  return naiveUrlFormatter({ pathname: newPathname, search });
}

export function resolveSortRangePath(path, newRange) {
  const { pathname, search } = naiveUrlParser(path);
  const params = Qs.parse(search.replace("?", ""));
  params.t = newRange;
  const newSearch = `${Qs.stringify(params)}`;
  return naiveUrlFormatter({ pathname, search: newSearch });
}
