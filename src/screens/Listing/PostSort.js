import React from "react";
import { View, Picker, StyleSheet } from "react-native";
import { withRouter } from "react-router-dom";

import * as reddit from "../../lib/reddit";
import * as design from "../../design";

export function PostListSort(props) {
  const { location } = props;
  const currentSortType = reddit.getSortType(location);

  return (
    <View style={styles.postListSort}>
      <Picker
        selectedValue={currentSortType}
        onValueChange={sortType => {
          const nextPath = reddit.resolveSortTypePath(location, sortType);
          props.history.push(nextPath);
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
            selectedValue={reddit.getSortRange(location)}
            onValueChange={sortRange => {
              const nextPath = reddit.resolveSortRangePath(location, sortRange);
              props.history.push(nextPath);
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

export default withRouter(PostListSort);
