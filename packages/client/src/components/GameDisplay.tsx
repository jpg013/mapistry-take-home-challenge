import { MouseEvent } from 'react';
import { Marker, Winner } from '@mapistry/take-home-challenge-shared';
import './GameDisplay.css';

type GameDisplayProps = {
  winner: keyof typeof Winner | null;
  playerMarker: Marker;
  handlePlayAgain: (event: MouseEvent) => void;
}

export const GameDisplay = ({ winner, playerMarker, handlePlayAgain }: GameDisplayProps) => {
  const renderDisplay = () => {
    if (!winner) {
      return null;
    }

    if (winner === Winner.tie) {
      return (
        <span className="game-display-label">
          Not bad! The game resulted in a Tie! <button className="btn" type="button" onClick={handlePlayAgain}>Play again?</button>
        </span>
      )
    }
    
    if (winner !== playerMarker) {
      return (
        <span className="game-display-label">
          Good try, but the computer beat you. <button className="btn" type="button" onClick={handlePlayAgain}>Play again?</button>
        </span>
      );
    }
    
    return (
      <span className="game-display-label">
        Congratulations! You beat the mighty computer! <button className="btn" type="button" onClick={handlePlayAgain}>Play again?</button>
      </span>
    );
  }
  
  return (
    <div className="game-display">
      { renderDisplay() }
    </div>
  );
}

