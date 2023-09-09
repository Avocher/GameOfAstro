export class Cache {
  array: Uint32Array;
  length: number = 0;
  constructor(dimensions: [number, number]) {
    this.array = new Uint32Array(dimensions[0] * dimensions[1] * 7);
  }

  insert(i: number) {
    this.array[this.length] = i;
    this.length++;
  }

  clear(): void {
    this.array.fill(0);
    this.length = 0;
  }
}
