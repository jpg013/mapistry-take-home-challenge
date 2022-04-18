import { useReducer, useEffect, useCallback } from "react"
import {
  Difficulty,
  Player,
  PlayerMove,
} from '@mapistry/take-home-challenge-shared';
import { GameBoard } from './Board';
import { ToggleDifficulty } from "./ToggleDifficulty";
import { reducer, initialState, ActionType } from '../state';
import { begin, move } from '../api';
import { GameDisplay } from "./GameDisplay";
import './Game.css';

export const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Effect that is run any time the "beginGame" flag changes
  // and indicates that we are starting a new game.
  useEffect(() => {
    if (!state.beginGame) {
      return;
    }

    // Create a new game by calling the `begin` api endpoint
    const beginGame = async () => {
      const resp = await begin(state.difficulty, Player.human);

      // If beginGame flag has changed since the results then bail.
      if (!state.beginGame) {
        return;
      }

      dispatch({ type: ActionType.ReceiveNewGame, status: resp });
    };

    beginGame();
  }, [state.beginGame, state.difficulty]);

  // Effect that runs any time the state playerTurn changes. If it is the
  // computer's turn, make an api call to get the next move and update the game state.
  useEffect(() => {
    if (state.playerTurn !== Player.computer) {
      return;
    }
    
    const makeComputerMove = async () => {
      try {
        const resp = await move(state.board, state.difficulty);

        // If playerTurn has changed since repsonse then bail.
        if (state.playerTurn !== Player.computer) {
          return;
        }

        dispatch({ type: ActionType.OpponentMove, status: resp, });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }

    makeComputerMove();
  }, [state.playerTurn, state.board, state.difficulty]);

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: ActionType.BeginGame });
  }, []);

  const handleMove = useCallback((m: PlayerMove) => {
    dispatch({ type: ActionType.PlayerMove, move: m, });
  }, []);

  const handleToggleDifficulty = useCallback(() => {
    dispatch({ type: ActionType.ToggleDifficulty });
  }, []);

  const { board, winner, winningLine } = state;

  return (
    <div className="game">
      <ToggleDifficulty 
        difficulty={state.difficulty} 
        handleToggle={handleToggleDifficulty}
        />
      <GameBoard 
        gameStatus={{ board, winner, winningLine }}
        playerMarker={state.playerMarker}
        handleMove={handleMove}
        isPlayerMove={state.playerTurn === Player.human}
        />
      <GameDisplay 
        winner={winner}
        playerMarker={state.playerMarker}
        handlePlayAgain={handlePlayAgain}
        />
    </div>
  )
};
