import { Cache } from "./Cache";
import type { CellState } from "./CellFactory";

export class State {
  private _array: Uint8Array;
  readonly maxCellX: number;
  readonly maxCellY: number;

  constructor(dimensions: [number, number]) {
    this.maxCellX = dimensions[0];
    this.maxCellY = dimensions[1];
    this._array = new Uint8Array(dimensions[0] * dimensions[1]);
  }

  clear(): void {
    this._array.fill(0);
  }

  get length(): number {
    return this._array.length;
  }

  indexToPos(index: number): [number, number] {
    return [index % this.maxCellX, Math.floor(index / this.maxCellX)];
  }

  posToIndex(x: number, y: number): number {
    return Math.min(Math.max(0, y * this.maxCellX + x), this._array.length - 1);
  }

  at(index: number): CellState {
    return this._array[index];
  }

  setAt(index: number, value: CellState): void {
    this._array[index] = value;
  }

  public set(x: number, y: number, value: CellState): void {
    this._array[this.posToIndex(x, y)] = value;
  }

  public get(x: number, y: number): CellState {
    if (x < 0 || x >= this.maxCellX || y < 0 || y >= this.maxCellY) {
      return 0;
    }
    return this._array[this.posToIndex(x, y)];
  }

  countAliveNeighbours(x: number, y: number): number {
    let count = 0;
    count += this.get(x - 1, y - 1); // top left
    count += this.get(x, y - 1); // top
    count += this.get(x + 1, y - 1); // top right
    count += this.get(x - 1, y); // left
    count += this.get(x + 1, y); // right
    count += this.get(x - 1, y + 1); // bottom left
    count += this.get(x, y + 1); // bottom
    count += this.get(x + 1, y + 1); // bottom right
    return count;
  }

  getNeighbours(x: number, y: number): CellState[] {
    return [
      this.posToIndex(x - 1, y - 1), // top left
      this.posToIndex(x, y - 1), // top
      this.posToIndex(x + 1, y - 1), // top right
      this.posToIndex(x - 1, y), // left
      this.posToIndex(x + 1, y), // right
      this.posToIndex(x - 1, y + 1), // bottom left
      this.posToIndex(x, y + 1), // bottom
      this.posToIndex(x + 1, y + 1), // bottom right
    ];
  }
}
