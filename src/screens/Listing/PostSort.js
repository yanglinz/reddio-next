import React from "react";
import { View, Picker, StyleSheet } from "react-native-web";
import Router from "next/router";

import * as reddit from "../../lib/reddit";
import * as design from "../../design";

export function PostListSort(props) {
  const { pathname } = props;
  const currentSortType = reddit.getSortType(pathname);

  return (
    <View style={styles.postListSort}>
      <Picker
        selectedValue={currentSortType}
        onValueChange={sortType => {
          const nextPath = reddit.resolveSortTypePath(pathname, sortType);
          Router.replace(nextPath);
        }}
      >
        <Picker.Item label="Hot" value={reddit.sortTypes.hot} />
        <Picker.Item label="New" value={reddit.sortTypes.new} />
        <Picker.Item label="Top" value={reddit.sortTypes.top} />
        <Picker.Item
          label="Controversial"
          value={reddit.sortTypes.controversial}
        />
        <Picker.Item label="Rising" value={reddit.sortTypes.rising} />
      </Picker>

      {currentSortType === reddit.sortTypes.top ? (
        <View style={styles.sortRange}>
          <Picker
            selectedValue={reddit.getSortRange(pathname)}
            onValueChange={sortRange => {
              const nextPath = reddit.resolveSortRangePath(pathname, sortRange);
              Router.replace(nextPath);
            }}
          >
            <Picker.Item label="Hour" value={reddit.sortRanges.hour} />
            <Picker.Item label="Day" value={reddit.sortRanges.day} />
            <Picker.Item label="Week" value={reddit.sortRanges.week} />
            <Picker.Item label="Month" value={reddit.sortRanges.month} />
            <Picker.Item label="Year" value={reddit.sortRanges.year} />
            <Picker.Item label="All" value={reddit.sortRanges.all} />
          </Picker>
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
