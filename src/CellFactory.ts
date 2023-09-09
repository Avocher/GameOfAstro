export const enum CellState {
  Dead = 0,
  Alive = 1,
}

export class CellFactory {
  readonly cellSize: number = 2;
  readonly ctx: CanvasRenderingContext2D;

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  public createCell(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  public draw(): void {
    this.ctx.fill();
  }

  get maxCellX(): number {
    return Math.floor(this.canvas.width / this.cellSize);
  }

  get maxCellY(): number {
    return Math.floor(this.canvas.height / this.cellSize);
  }
}
