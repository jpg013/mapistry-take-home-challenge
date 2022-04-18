import clsx from 'clsx';
import { Difficulty, } from '@mapistry/take-home-challenge-shared';
import './ToggleDifficulty.css';

type ToggleDifficultyProps = {
  difficulty: Difficulty;
  handleToggle: () => void;
}

export const ToggleDifficulty = ({ difficulty, handleToggle }: ToggleDifficultyProps) => {
  const easyMode = difficulty === Difficulty.easy;
  
  return (
    <div className="toggle-difficulty-container">
      <button 
        onClick={handleToggle}
        type="button" 
        className={clsx('toggle-difficulty-btn', { active: easyMode })}
      >Easy
      </button>
      <button 
        onClick={handleToggle}
        type="button" 
        className={clsx('toggle-difficulty-btn', { active: !easyMode })}
      >Hard
      </button>
    </div>
  );
}