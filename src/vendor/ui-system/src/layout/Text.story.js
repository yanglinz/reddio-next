import React from "react";

import Text from "./Text";
import Outline from "../storybook/Outline";

export const main = () => {
  let sizes = [4, 8, 10, 12, 14, 16, 18, 24, 32, 48];
  sizes = [].concat(sizes, sizes.slice().reverse());

  return (
    <Outline>
      {sizes.map((s, i) => (
        <Text key={i} size={s}>
          Hello design system!
        </Text>
      ))}
    </Outline>
  );
};

export default { title: "Text" };
