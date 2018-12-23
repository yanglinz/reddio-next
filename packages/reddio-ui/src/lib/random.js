const MAX_INT32 = 2147483647;
const MIN_STD = 16807;

export class SeededRandom {
  constructor(seed) {
    let sourceSeed = seed % MAX_INT32;
    if (sourceSeed <= 0) {
      sourceSeed += MAX_INT32 - 1;
    }
    this.seed = sourceSeed;
  }

  next = () => {
    return (this.seed = (this.seed * MIN_STD) % MAX_INT32);
  };

  nextFloat = () => {
    return (this.next() - 1) / (MAX_INT32 - 1);
  };
}
