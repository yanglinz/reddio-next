import React from "react";
import { View, Picker, StyleSheet } from "react-native";
import { withRouter } from "react-router-dom";
import first from "lodash/first";
import last from "lodash/last";
import dropRight from "lodash/dropRight";

const sortTypes = { hot: "hot", top: "top", new: "new" };

export function getSortType(location) {
  const { pathname } = location;
  if (pathname === "/") {
    return sortTypes.hot;
  }

  const pathParts = pathname.split("/");
  const pathNamedParts = pathParts.filter(Boolean);
  const lastPart = last(pathNamedParts);

  if (sortTypes[lastPart.toLowerCase()]) {
    return sortTypes[lastPart.toLowerCase()];
  }

  // Return the default sortType of hot if we don't know
  return sortTypes.hot;
}

export function getSortRange(location) {
  // TODO
}

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

  const hasSortType = sortTypes[last(pathNamedParts)];
  let newParts;
  if (hasSortType) {
    newParts = dropRight(pathParts).concat(newSort);
  } else {
    newParts = pathParts.concat(newSort);
  }

  return { pathname: newParts.join("/"), search };
}

export function resolveSortRangePath(location, newRange) {
  const { pathname, search } = location;
  return { pathname, search };
}

export function PostListSort(props) {
  const { location } = props;

  return (
    <View style={styles.postListSort}>
      <Picker
        selectedValue={getSortType(location)}
        onValueChange={sortType => {
          const nextPath = resolveSortTypePath(location, sortType);
          props.history.push(nextPath);
        }}
      >
        <Picker.Item label="Hot" value={sortTypes.hot} />
        <Picker.Item label="New" value={sortTypes.new} />
        <Picker.Item label="Top" value={sortTypes.top} />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  postListSort: {
    padding: 16
  }
});

export default withRouter(PostListSort);
