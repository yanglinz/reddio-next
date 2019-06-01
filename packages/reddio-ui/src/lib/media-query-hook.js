import { useMediaLayout } from "use-media";

import * as design from "../design";

const smallBreak = design.layoutWidth.small;
const mediumBreak = design.layoutWidth.medium;
const largeBreak = design.layoutWidth.large;

function useMediaQuery() {
  const small = useMediaLayout({ minWidth: smallBreak });
  const medium = useMediaLayout({ minWidth: mediumBreak });
  const large = useMediaLayout({ minWidth: largeBreak });
  const mq = { large, medium, small };
  return mq;
}

export default useMediaQuery;
