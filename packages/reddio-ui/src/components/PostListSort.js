import React from "react";
import { Picker } from "react-native";
import { withRouter } from "react-router-dom";
import first from "lodash/first";
import last from "lodash/last";
import dropRight from "lodash/dropRight";

function getSortType(location) {
  // TODO
}

function getSortRange(location) {
  // TODO
}

const sortTypes = ["hot", "top", "new"];

export function resolveSortTypePath(location, newSort) {
  const { pathname, search } = location;

  // Depending on if we're on a subreddit or a multireddit
  // We could have differing number of parts in our path.
  const pathParts = pathname.split("/");
  const pathNamedParts = pathParts.filter(Boolean);

  // Handle root case, where currently the user is at the root path
  const atRoot = pathNamedParts.length <= 1;
  if (atRoot) {
    if (pathname === "/" && newSort === "hot") {
      return { pathname, search };
    }

    const newPathname = `/${newSort}`;
    return { pathname: newPathname, search };
  }

  // Handle subreddits and multireddits
  // If we're at the root and we're trying to navigate to a hot sort type
  // We want to preserve the existing path instead of tacking on /hot
  const atListingRoot =
    first(pathNamedParts) === "r" && pathNamedParts.length === 2;
  if (atListingRoot && newSort === "hot") {
    return { pathname, search };
  }

  const hasSortType = sortTypes.includes(last(pathNamedParts));
  let newParts;
  if (hasSortType) {
    newParts = dropRight(pathParts).concat(newSort);
  } else {
    newParts = pathParts.concat(newSort);
  }

  return { pathname: newParts.join("/"), search };
}

export function PostListSort() {
  return (
    <div className="PostListSort">
      <Picker selectedValue={"key0"} onValueChange={v => console.log(v)}>
        <Picker.Item label="hello" value="key0" />
        <Picker.Item label="world" value="key1" />
      </Picker>
    </div>
  );
}

export default PostListSort;
