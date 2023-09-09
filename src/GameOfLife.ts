import { CellState } from "./CellFactory";
import type { State } from "./State";

export function getNewCellState(
  state: State,
  i: number,
  x: number,
  y: number
): CellState {
  const currentCellState = state.at(i);
  const aliveNeighbours = state.countAliveNeighbours(x, y);

  if (currentCellState === CellState.Dead) {
    if (aliveNeighbours === 3) {
      return CellState.Alive;
    } else {
      return CellState.Dead;
    }
  }

  if (currentCellState === CellState.Alive) {
    if (aliveNeighbours == 2 || aliveNeighbours == 3) {
      return CellState.Alive;
    } else {
      return CellState.Dead;
    }
  }

  throw new Error("Invalid cell state");
}
