const MAX_INT32 = 2147483647;
const MIN_STD = 16807;

/**
 * Generate a hashed number based on input string
 * Taken from https://github.com/darkskyapp/string-hash/blob/master/index.js
 */
export function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  // JavaScript does bitwise operations (like XOR, above) on 32-bit signed
  // integers. Since we want the results to be always positive, convert the
  // signed int to an unsigned by doing an unsigned bitshift.
  return hash >>> 0;
}

export class SeededRandom {
  constructor(seed) {
    let sourceSeed = seed % MAX_INT32;
    if (sourceSeed <= 0) {
      sourceSeed += MAX_INT32 - 1;
    }
    this.seed = sourceSeed;
  }

  next() {
    return (this.seed = (this.seed * MIN_STD) % MAX_INT32);
  }

  nextFloat() {
    return (this.next() - 1) / (MAX_INT32 - 1);
  }
}
