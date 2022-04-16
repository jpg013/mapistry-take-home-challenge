import { _, GameStatus, Marker, PlayerMove } from '@mapistry/take-home-challenge-shared';
import { useCallback } from 'react';
import clsx from 'clsx';
import { DrawWinningLine } from './DrawWinningLine';
import { BoardSquare } from './BoardSquare';
import './Board.css';

type GameBoardProps = {
  gameStatus: GameStatus;
  handleMove: (m: PlayerMove) => void;
  isPlayerMove: boolean;
  playerMarker: Marker;
};

export const GameBoard = ({ 
  gameStatus,
  handleMove,
  isPlayerMove,
  playerMarker,
}: GameBoardProps) => {
  const { board, winner, winningLine } = gameStatus;
  
  // Handler for when a user clicks on a Board Square.
  const handleSquareClick = useCallback((pos: number): void => {
    handleMove({
      position: pos,
      marker: playerMarker,
    });
  }, [playerMarker, handleMove]);

  const renderBoardSquare = (m: (Marker | typeof _), pos: number) => (
    <BoardSquare
      winningLine={winningLine}
      handleClick={handleSquareClick}
      // construct array key by concatenating the idx + marker
      key={`${pos}:${m}`}
      position={pos} 
      marker={m}
    />
  );

  const className = clsx('board', {
    'disabled': !isPlayerMove || winner,
  });
  
  return (
    <div className={className}>
      { board.map(renderBoardSquare) }
      <DrawWinningLine 
        winningLine={winningLine}
        playerMarker={playerMarker}
        winner={winner} 
      />
    </div>
  )
};