import {
  Board,
  GameStatus,
  _,
  Difficulty
} from '@mapistry/take-home-challenge-shared';
import { Router } from 'express';
import {
  playBestMove,
  playRandomMove,
  isBoardIsValid,
  buildGameStatus,
  determineWinningLine,
} from './gameService';

export const router = Router();

interface MoveBody {
  board: Board;
  difficulty: Difficulty;
}

router.post<'/begin', never, GameStatus>('/begin', (req, res) => {
  const gameStatus = {
    board: [_, _, _, _, _, _, _, _, _],
    winner: null,
  };
  res.json(gameStatus);
});

router.post<'/move', never, GameStatus | Error, MoveBody>('/move', (req, res) => {
  const { board, difficulty } = req.body;

  // Check if board input is invalid and return a BadRequest error if not.
  if (!isBoardIsValid(board)) {
    res.status(400).send(new Error('Board is invalid'));
    return;
  }

  // Ensure that there isn't already a game "winner" before making a move.
  if (determineWinningLine(board)) {
    res.json(buildGameStatus(board));
    return;
  }

  // Call "playBestMove" with the input board to place the
  // optimal move for the current player's turn.
  const updatedBoard = (difficulty === Difficulty.easy) ?
    playRandomMove(board) :
    playBestMove(board);

  // Return the new game status with the updated board
  res.json(buildGameStatus(updatedBoard));
});
