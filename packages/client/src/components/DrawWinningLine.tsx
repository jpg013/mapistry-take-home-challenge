import { WinningLine, Winner, Marker } from '@mapistry/take-home-challenge-shared';
import clsx from 'clsx';
import './DrawWinningLine.css';

type DrawWinningLineProps = {
  winningLine: WinningLine | undefined;
  playerMarker: Marker;
  winner: keyof typeof Winner | null;
};

// Constant that defines the dimension of a Board Space
const boardSpaceSize = 200;

// Constant that defines the width of the WiningLine
const lineWidth = 10;

export const DrawWinningLine = ({ winningLine, winner, playerMarker, }: DrawWinningLineProps) => {
  const determineLineTransform = (): string => {
    if (!winningLine) {
      return `translate(-10000px, 0) rotate(0)`;
    }
    
    const { row, column, diagonal } = winningLine;

    if (row !== undefined) {
      // Row value can be one of {0,1,2}, to place the WinningLine across the row
      // correctly we need to first rotate the line -90 degrees, then adjust the "y"
      // translate by multiplying the row and the boardSpaceSize (from +1 to offset for zero)
      // and then dividing by half the board space size to place in the middle of the space.
      const translateX = -(lineWidth/2);
      const translateY = ((row+1) * (boardSpaceSize) - (boardSpaceSize/2));
      const rotate = -90;

      return `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
    }

    if (column !== undefined) {
      // Column is easiest case since there is not rotation, just need to adjust the 
      // x translate by the column times the boardSpaceSize, and then add half the boardSpaceSize
      // and subtract half the line width to place directly in the middle of the column.
      const translateX = (column * boardSpaceSize) + (boardSpaceSize / 2) - (lineWidth / 2);
      const translateY = 0;
      const rotate = 0;

      return `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
    }

    // If diagonal is zero, rotate -45 degrees and then translate by half the board space size.
    if (diagonal === 0) {
      const translate = (boardSpaceSize / 2) - (lineWidth);
      const rotate = -45;

      return `translate(${translate}px, ${translate}px) rotate(${rotate}deg)`;
    }

    // Case for when diagonal is 1, rotate +45 degrees and translate.
    const translateX = (2*boardSpaceSize) + (boardSpaceSize/2) + (lineWidth/2);
    const translateY = (boardSpaceSize/2) - lineWidth;
    const rotate = 45;

    return `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`; 
  }

  const style = {
    transform: determineLineTransform(),
  };

  const classnames = clsx('draw', {
    'opponent': winner !== playerMarker,
    'player': winner === playerMarker,
  });

  return (
    <div className="winning-line" style={style}>
      { winningLine && <div className={classnames} /> }
    </div>
  );
}
