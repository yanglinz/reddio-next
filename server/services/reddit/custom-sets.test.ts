import * as _ from "lodash";

import { CUSTOM_METADATA, TOP_SUBREDDITS } from "./custom-sets";

describe("custom sets", () => {
  it("should have metadata for all sets", () => {
    const allListings = TOP_SUBREDDITS;
    _.each(allListings, l => {
      expect(_.isString(l)).toEqual(true);
      expect(_.isEmpty(CUSTOM_METADATA[l])).toEqual(false);
    });
  });
});
