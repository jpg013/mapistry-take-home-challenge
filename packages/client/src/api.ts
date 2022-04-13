import {
  Board,
  Difficulty,
  GameStatus,
  Player,
} from '@mapistry/take-home-challenge-shared';

export const begin = async (
  difficulty: Difficulty,
  whoIsFirst: Player,
): Promise<GameStatus> => {
  const response = await fetch('/api/begin', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ difficulty, whoIsFirst }),
  });

  const status: GameStatus = await response.json();
  return status;
};

export const move = async (
  board: Board,
  difficulty: Difficulty,
): Promise<GameStatus> => {
  const response = await fetch('/api/move', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ board, difficulty }),
  });

  const status: GameStatus = await response.json();
  return status;
};
