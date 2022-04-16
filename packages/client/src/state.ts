import {
  GameStatus,
  WinningLine,
  Winner,
  Board,
  Player,
  Marker,
  PlayerMove as Move,
  Difficulty,
} from '@mapistry/take-home-challenge-shared';
import { makeMove } from '@mapistry/take-home-challenge-shared/src/helpers';

type GameState = {
  board: Board;
  winningLine?: WinningLine;
  winner: keyof typeof Winner | null;
  playerTurn: Player;
  playerMarker: Marker;
  beginGame: boolean;
  difficulty: Difficulty;
};

export enum ActionType {
  BeginGame = 'beginGame',
  UpdateGameStatus = 'updateGameStatus',
  PlayerMove = 'playerMove',
  OpponentMove = 'opponentMove',
  ReceiveNewGame = 'receiveNewGameStatus',
  ToggleDifficulty = 'toggleDifficulty',
};

// Defined actions that can be sent to the reducer.
type Action = 
  | { type: ActionType.BeginGame }
  | { type: ActionType.OpponentMove, status: GameStatus }
  | { type: ActionType.ReceiveNewGame, status: GameStatus }
  | { type: ActionType.ToggleDifficulty, }
  | { type: ActionType.PlayerMove, move: Move };


// Creates a returns a brand new game state.
export const newGameState = (): GameState => ({
  playerTurn: Player.human,
  board: [],
  winner: null,
  winningLine: undefined,
  // Player marker defaults to "x"
  playerMarker: Marker.x,
  beginGame: true,
  difficulty: Difficulty.easy,
});

export const reducer = (prevState: GameState, action: Action): GameState => {
  const { type } = action;

  switch(type) {
    case ActionType.BeginGame:
      return {
        ...prevState,
        beginGame: true,
      }
    case ActionType.ReceiveNewGame:
      return {
        ...prevState,
        ...action.status,
        winningLine: undefined,
        beginGame: false,
      };
    case ActionType.OpponentMove:
      return {
        ...prevState,
        ...action.status,
        playerTurn: prevState.playerTurn === Player.computer ? Player.human : Player.computer,
      };
    case ActionType.PlayerMove:
      return {
        ...prevState,
        board: makeMove(prevState.board, action.move),
        playerTurn: prevState.playerTurn === Player.computer ? Player.human : Player.computer,
      };
    case ActionType.ToggleDifficulty:
      return {
        ...prevState,
        difficulty: prevState.difficulty === Difficulty.easy ? Difficulty.hard : Difficulty.easy,
      };
    default:
      return prevState;
  }
};

export const initialState = newGameState();
