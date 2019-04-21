import { useMedia } from "use-media";

import * as design from "../design";

const smallBreak = design.layoutWidth.small;
const mediumBreak = design.layoutWidth.medium;
const largeBreak = design.layoutWidth.large;

function useMediaQuery() {
  const small = useMedia({ minWidth: smallBreak });
  const medium = useMedia({ minWidth: mediumBreak });
  const large = useMedia({ minWidth: largeBreak });
  const mq = { large, medium, small };
  return mq;
}

export default useMediaQuery;
