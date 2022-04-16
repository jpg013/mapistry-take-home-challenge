import { _, Marker, WinningLine, rowIndices, colIndices, isWithinWinningLine } from '@mapistry/take-home-challenge-shared';
import clsx from 'clsx';
import './BoardSquare.css';

type BoardSquareProps = {
  position: number;
  marker: (Marker | typeof _);
  handleClick: (num: number) => void;
  winningLine: WinningLine | undefined;
};

// returns true if position on the top row of the board
const isTop = (position: number): boolean => rowIndices[0].includes(position);
// returns true is position on the bottom row of the board
const isBottom = (position: number): boolean => rowIndices[rowIndices.length-1].includes(position);
// returns true if position on the left column of the board
const isLeft = (position: number): boolean => colIndices[0].includes(position);
// returns true if position on the right column of the board
const isRight = (position: number): boolean => colIndices[colIndices.length-1].includes(position);

export const BoardSquare = ({ position, marker, handleClick, winningLine }: BoardSquareProps) => {
  const isInWinningLine = isWithinWinningLine(position, winningLine);
  const classnamees = clsx('board-square', {
    'top': isTop(position),
    'bottom': isBottom(position),
    'left': isLeft(position),
    'right': isRight(position),
    'selected': marker !== _,
    'lost': winningLine && !isInWinningLine,
    'won': winningLine && isInWinningLine,
  });

  return (
    <button
      type="button"
      className={classnamees}
      onClick={() => handleClick(position)}
    >
      {marker === Marker.x && <div className="board-square-x" />}
      {marker === Marker.o && <div className="board-square-o" />}
    </button>
  );
};
