import { _, Marker, Winner } from './constants';

export type Board = (Marker | typeof _)[];

// rows are labelled 0, 1, 2 top to bottom
// columns are labelled 0, 1, 2 left to right
// diagonal 0 is top left to bottom right, diagonal 1 is top right to bottom left
export interface WinningLine {
  column?: number;
  diagonal?: number;
  row?: number;
}

export type GameStatus = {
  board: Board;
  winner: keyof typeof Winner | null;
  winningLine?: WinningLine;
};

export type WinnerKey = keyof typeof Winner;
