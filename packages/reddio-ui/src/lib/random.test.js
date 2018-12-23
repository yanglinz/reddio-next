import _ from "lodash";

import { SeededRandom } from "./random";

describe("SeededRandom", () => {
  it("should generate ints", () => {
    const rng = new SeededRandom(123);
    _.times(100, () => {
      const next = rng.next();
      expect(Number.isInteger(next)).toEqual(true);
    });
  });

  it("should generate floats", () => {
    const rng = new SeededRandom(123);
    _.times(100, () => {
      const next = rng.nextFloat();
      expect(Number.isInteger(next)).toEqual(false);
      expect(next > 0).toEqual(true);
      expect(next < 1).toEqual(true);
    });
  });

  it("should generate number given the same seed", () => {
    const rng1 = new SeededRandom(123);
    const rng2 = new SeededRandom(123);
    expect(rng1.next() === rng2.next()).toEqual(true);
  });

  it("should generate number given different seeds", () => {
    const rng1 = new SeededRandom(123);
    const rng2 = new SeededRandom(456);
    expect(rng1.next() !== rng2.next()).toEqual(true);
  });
});
