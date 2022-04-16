import { _, Marker, makeMove } from '@mapistry/take-home-challenge-shared';
import {
  isBoardTerminal,
  evaluateBoard,
  determinePlayerMarker,
  minimax,
  allMarkersEqual,
  getBoardValues,
  getAllowedBoardMoves,
  maximizingScore,
  minimizingScore,
  playBestMove,
  isBoardIsValid,
  buildGameStatus,
} from './gameService';

describe('gameService', () => {
  describe('makeMove', () => {
    let board: (Marker | typeof _)[] = [];
    
    beforeEach(() => {
      board = [
        Marker.x, _, _, 
        Marker.x, _,  Marker.o, 
        _, Marker.o, _,
      ];
    });
    
    it('returns the new board with the move correctly made', () => {
      const playerMove = {
        position: 8,
        marker: Marker.x,
      };
      
      expect(makeMove(board, playerMove)).toStrictEqual([
        Marker.x, _, _, 
        Marker.x, _,  Marker.o, 
        _, Marker.o, Marker.x,
      ]);
    });
  
    it('throws an error when move is out of bounds', () => {
      let errMsg;
      const playerMove = {
        position: 12,
        marker: Marker.x,
      };
  
      try {
        expect(makeMove(board, playerMove)).toStrictEqual([
          Marker.x, _, _, 
          Marker.x, _,  Marker.o, 
          _, Marker.o, Marker.x,
        ]);
      } catch (err) {
        errMsg = (err as Error).message;
      }
  
      expect(errMsg).toStrictEqual('move is out of bounds');
    });
  
    it('throws an error when move already exists', () => {
      let errMsg;
      const playerMove = {
        position: 0,
        marker: Marker.x,
      };
  
      try {
        expect(makeMove(board, playerMove)).toStrictEqual([
          Marker.x, _, _, 
          Marker.x, _,  Marker.o, 
          _, Marker.o, Marker.x,
        ]);
      } catch (err) {
        errMsg = (err as Error).message;
      }
  
      expect(errMsg).toStrictEqual('move already exists');
    });
  });
  
  describe('ensureBoardIsValid', () => {
    test('it returns true for valid board', () => {
      const board = [_, _, Marker.x, Marker.x, Marker.x, Marker.o, Marker.o, _, _];

      expect(isBoardIsValid(board)).toBeTruthy();
    });

    test('it returns false when the size is invalid', () => {
      const board = [_, _, Marker.x, Marker.x];

      expect(isBoardIsValid(board)).toBeFalsy();
    });

    test('it returns false when there are invalid markers on the board', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const board: any = [_, _, 'X', 'O', 123, Marker.o, Marker.o, _, _];

      expect(isBoardIsValid(board)).toBeFalsy();
    });

    test('it returns false when the number of X Markers is too high', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const board: any = [_, _, _, _, _, Marker.x, Marker.x, _, _];

      expect(isBoardIsValid(board)).toBeFalsy();
    });

    test('it returns false when the number of O Markers is too high', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const board: any = [_, _, _, _, _, Marker.o, _, _, _];

      expect(isBoardIsValid(board)).toBeFalsy();
    });
  });
  
  describe('isBoardTerminal', () => {
    it('returns true when no moves are available', () => {
      const board = [Marker.x, Marker.x, Marker.o, Marker.x, Marker.x, Marker.x, Marker.x, Marker.o, Marker.o];

      expect(isBoardTerminal(board)).toBeTruthy();
    });

    it('returns false when there are moves are available', () => {
      const board = [Marker.x, _, _, _, _, _, _, _, Marker.o];
      
      expect(isBoardTerminal(board)).toBeFalsy();
    });
  });

  describe('allMarkersEqual', () => {
    it('returns true when all markers are equal', () => {
      expect(allMarkersEqual(Marker.x, Marker.x, Marker.x)).toBeTruthy();
      expect(allMarkersEqual(Marker.o, Marker.o)).toBeTruthy();
    });

    it('returns true when all markers are NOT equal', () => {
      expect(allMarkersEqual(Marker.x, Marker.o, Marker.x)).toBeFalsy();
      expect(allMarkersEqual(Marker.o, Marker.o, _)).toBeFalsy();
    });
  });

  describe('getBoardValues', () => {
    it('returns the correct board values for provided indices', () => {
      const board = [
        Marker.x, _, _,
        Marker.x, _,  Marker.o,
        _, Marker.o, _,
      ];

      expect(getBoardValues(board, 0, 3, 6)).toStrictEqual([Marker.x, Marker.x, _]);
    });
  });


  describe('evaluateBoard', () => {
    it('returns maximizingScore when the maximizer has won', () => {
      /*
        Board
        -------
        X  O  X
        O  O  X
        O  X  X
        -------
      */
      const board = [Marker.x, Marker.o, Marker.x, Marker.o, Marker.o, Marker.x, Marker.o, Marker.x, Marker.x];
      const maximizingMove = Marker.x;

      expect(evaluateBoard(board, maximizingMove)).toBe(maximizingScore);
    });

    it('returns minimizingScore when the minimizer has won', () => {
      /*
        Board
        -------
        O  _  X
        _  X  X
        X  O  O
        -------
      */
      
      const board = [Marker.o, _, Marker.x, _, Marker.x, Marker.x, Marker.x, Marker.o, Marker.o];
      const maximizingMove = Marker.o;

      expect(evaluateBoard(board, maximizingMove)).toBe(minimizingScore);
    });

    it('returns 0 when there is no winner', () => {
      const board = [Marker.x, _, Marker.o, _, Marker.x, _, _, Marker.x, Marker.o];

      expect(evaluateBoard(board, Marker.x)).toBe(0);
    });
  });

  describe('getAllowedBoardMoves', () => {
    it('returns the correct moves', () => {
      /*
        Board
        -------
        O  _  X
        _  X  X
        X  O  O
        -------
      */
      
      const board = [Marker.o, _, Marker.x, _, Marker.x, _, Marker.x, Marker.o, _];

      expect(getAllowedBoardMoves(board)).toStrictEqual([1, 3, 5, 8]);
    });
  });

  describe('determinePlayerMarker', () => {
    it('returns X when then Marker.x count is equal to the Marker.o count', () => {
      /*
        Board
        -------
        O  _  X
        _  _  X
        X  O  O
        -------
      */
      const board = [Marker.o, _, Marker.x, _, _, _, Marker.x, Marker.o, _];

      expect(determinePlayerMarker(board)).toBe(Marker.x);
    });

    it('returns O when then Marker.x count is greater than the Marker.o count', () => {
      /*
        Board
        -------
        O  X  X
        _  _  _
        X  O  O
        -------
      */
      const board = [Marker.o, Marker.x, Marker.x, _, _, _, Marker.x, Marker.o, _];

      expect(determinePlayerMarker(board)).toBe(Marker.o);
    });
  });

  describe('minimax', () => {
    it('returns the maximizing score', () => {
      /*
        Board
        -------
        O  X  X
        _  _  _
        X  O  O
        -------
      */
      const board = [
        Marker.x, Marker.o, Marker.x,
        Marker.o, Marker.o, Marker.x, 
        _, _, _
      ];
      const result = minimax(board, 0, true, Marker.x);

      expect(result).toStrictEqual(maximizingScore);
    });

    it('returns the minimizing score', () => {
      /*
        Board
        -------
        O  X  X
        _  _  X
        _  O  O
        -------
      */
      const board = [
        Marker.o, Marker.x, Marker.x,
        _, _, Marker.x, 
        _, Marker.o, Marker.o
      ];
      const result = minimax(board, 0, true, Marker.x);

      expect(result).toStrictEqual(minimizingScore);
    });
  });

  describe('playBestMove', () => {
    test('empty board results in tie', () => {
      let board: (Marker | typeof _)[] = [_, _, _, _, _, _, _, _, _];
      
      while (!isBoardTerminal(board)) {
        board = playBestMove(board);
      }

      expect(board).toStrictEqual([
        Marker.x, Marker.x, Marker.o,
        Marker.o, Marker.o, Marker.x,
        Marker.x, Marker.o, Marker.x,
      ]);
    });
  });

  describe('buildGameStatus', () => {
    test('it returns correct WinningLine and Winner', () => {
      /*
        Board
        -------
        O  X  X
        _  O  X
        _  O  O
        -------
      */
      const board = [Marker.o, Marker.x, Marker.x, _, Marker.o, Marker.x, _, Marker.o, Marker.o];
      const status = buildGameStatus(board);

      expect(status).toStrictEqual({
        board,
        winner: Marker.o,
        winningLine: { diagonal: 0 }
      });
    });
  });
});
