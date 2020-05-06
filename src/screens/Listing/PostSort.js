import React from "react";
import { View, StyleSheet } from "react-native-web";
import Router from "next/router";
import { Listbox, ListboxOption } from "@reach/listbox";

import * as reddit from "../../lib/reddit";
import * as design from "../../styles/design";

export function PostListSort(props) {
  const { pathname } = props;
  const currentSortType = reddit.getSortType(pathname);

  return (
    <View style={styles.postListSort}>
      <Listbox
        value={currentSortType}
        onChange={sortType => {
          const nextPath = reddit.resolveSortTypePath(pathname, sortType);
          Router.replace(nextPath);
        }}
      >
        <ListboxOption value={reddit.sortTypes.hot}>Hot</ListboxOption>
        <ListboxOption value={reddit.sortTypes.new}>New</ListboxOption>
        <ListboxOption value={reddit.sortTypes.top}>Top</ListboxOption>
        <ListboxOption value={reddit.sortTypes.controversial}>
          Controversial
        </ListboxOption>
        <ListboxOption value={reddit.sortTypes.rising}>Rising</ListboxOption>
      </Listbox>

      {currentSortType === reddit.sortTypes.top ? (
        <View style={styles.sortRange}>
          <Listbox
            value={reddit.getSortRange(pathname)}
            onChange={sortRange => {
              const nextPath = reddit.resolveSortRangePath(pathname, sortRange);
              Router.replace(nextPath);
            }}
          >
            <ListboxOption value={reddit.sortRanges.hour}>Hour</ListboxOption>
            <ListboxOption value={reddit.sortRanges.day}>Day</ListboxOption>
            <ListboxOption value={reddit.sortRanges.week}>Week</ListboxOption>
            <ListboxOption value={reddit.sortRanges.month}>Month</ListboxOption>
            <ListboxOption value={reddit.sortRanges.year}>Year</ListboxOption>
            <ListboxOption value={reddit.sortRanges.all}>All</ListboxOption>
          </Listbox>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  postListSort: {
    paddingTop: design.spacing.base,
    paddingBottom: design.spacing.base,
    paddingLeft: design.spacing.small,
    paddingRight: design.spacing.small
  },
  sortRange: {
    paddingTop: design.spacing.smaller2
  }
});

export default PostListSort;
