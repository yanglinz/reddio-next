import React from "react";
import { Picker } from "react-native";

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
