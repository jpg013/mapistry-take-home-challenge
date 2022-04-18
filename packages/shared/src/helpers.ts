import { WinningLine, Board, PlayerMove, } from './types';
import { _, rowIndices, colIndices, diagIndices, } from './constants';


/**
 * Accepts a board position and a WinningLine and returns true if the
 * position is in the winning line, else false.
 * @param pos - number
 * @param winningLine - WinningLine
 * @returns boolean
 */
export const isWithinWinningLine = (pos: number, winningLine: WinningLine | undefined) => {
  if (!winningLine) {
    return false;
  }

  const { row, column, diagonal } = winningLine;

  if (row !== undefined) {
    return rowIndices[row]?.includes(pos);
  }

  if (column !== undefined) {
    return colIndices[column]?.includes(pos);
  }

  if (diagonal !== undefined) {
    return diagIndices[diagonal]?.includes(pos);
  }
  
  return false;
}

/**
 * Accepts a board and a move and returns a new updated board with the marker
 * placed at the move location. If the move is out of bounds, or if a move
 * already exists for the given location, then an error will be thrown.
 * @param board - Board
 * @param move - PlayerMove
 * @returns Board
 */
 export const makeMove = (board: Board, move: PlayerMove): Board => {
  const { position, marker } = move;

  if (board[position] === undefined) {
    throw new Error('move is out of bounds');
  }

  if (board[position] !== _) {
    throw new Error('move already exists');
  }

  return [
    ...board.slice(0, position),
    marker,
    ...board.slice(position + 1),
  ];
};