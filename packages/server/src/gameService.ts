import {
  Board,
  GameStatus,
  Marker,
  WinningLine,
  Winner,
  makeMove,
  rowIndices,
  colIndices,
  diagIndices,
  _,
} from '@mapistry/take-home-challenge-shared';

export const maximizingScore = 10;
export const minimizingScore = -10;
export const boardSize = 9;

/**
 * A valid game board is an array having size of 9, and each item in the array
 * is one of a (Marker | typeof _).
 */
export const isBoardIsValid = (b: Board): boolean => {
  if (b.length !== boardSize) {
    return false;
  }
  
  if (!b.every((curr) => [Marker.x, Marker.o, _].includes(curr))) {
    return false;
  };

  // Count number of X's on the board
  const xCount = b.filter((m) => m === Marker.x).length;
  // Count number of Y's on the board
  const oCount = b.filter((m) => m === Marker.o).length;
  // Difference between two counts
  const diff = xCount - oCount;
  // X count must be equal to, or no more than 1 greater than the O count.
  return diff >= 0 && diff <= 1;
}

/**
 * Returns true if every move on the board has been made (i.e. non of the values are of type "_"), else false.
 */
export const isBoardTerminal = (b: Board) => !b.some((m) => m === _);

// Helper function that takes an array of type (Marker | typeof _) and returns true if each item
// is strictly a Marker value (i.e. Marker.x | Marker.o) and if each item in the array is the same. 
// For example, the following would return true - [Marker.o, Marker.o, Marker.o] while the following would
// return false - [Marker.o, Marker.o, _].
export const allMarkersEqual = (...vals: (Marker | typeof _)[])  => vals.every((v) => v !== _ && v === vals[0]);

/**
 * Accept a gase board, and a list of "indices" on the board and returns a list of
 * state values corresponding to each provided index.
 * @param b - Board
 * @param idxs - number[]
 * returns - (Marker | typeof _)[]
 */
export const getBoardValues = (b: Board, ...idxs: number[]): (Marker | typeof _)[] => idxs.map(idx => b[idx]);

/**
 * determineWinningLine
 * @param b 
 * @returns number[] | null
 */
export const determineWinningLine = (b: Board): WinningLine | null => {
  const rowIdx = rowIndices.findIndex((idxs: number[]) => allMarkersEqual(...getBoardValues(b, ...idxs)));
  
  if (rowIdx !== -1) {
    return { row: rowIdx }
  }
  
  const colIdx = colIndices.findIndex((idxs: number[]) => allMarkersEqual(...getBoardValues(b, ...idxs)));
  
  if (colIdx !== -1) {
    return { column: colIdx }
  }

  const diagIdx = diagIndices.findIndex((idxs: number[]) => allMarkersEqual(...getBoardValues(b, ...idxs)));
  
  if (diagIdx !== -1) {
    return { diagonal: diagIdx };
  }

  return null;
}

export const tryGetWinningLineMarker = (b: Board, line: WinningLine): Marker => {
  const { row, column, diagonal } = line;

  let winningMarker: (Marker | typeof _) = null;

  if (row !== undefined) {
    [winningMarker] = getBoardValues(b, rowIndices[row][0]);
  } else if (column !== undefined) {
    [winningMarker] = getBoardValues(b, colIndices[column][0]);
  } else if (diagonal !== undefined) {
    [winningMarker] = getBoardValues(b, diagIndices[diagonal][0]);
  }

  if (winningMarker === null) {
    throw new Error(`WinningLine ${line} contains empty "_" move`);
  }

  return winningMarker;
}

/**
 * Accepts a Board and a playerMove and returns the maximizingScore (+10 in this case) if the board 
 * is in a status where the maximizer has won, or returns the minimizingScore (-10 here) if the board
 * has been won by the minimizerm and 0 if neither has won. The playerMove represents the current Marker for the Maximizer,
 * since the Maximizer can be running for either a Marker.x or Marker.o move.
 * @param b - Board
 * @param playerMove - Marker
 * returns number
 */
export const evaluateBoard = (b: Board, maximizingMove: Marker): number => {
  const winningLine = determineWinningLine(b);
  
  if (!winningLine) {
    return 0;
  }
  
  const winningMarker = tryGetWinningLineMarker(b, winningLine);

  return (winningMarker === maximizingMove) ? maximizingScore : minimizingScore;
};

export const toggleMarker = (m: Marker) => m === Marker.x ? Marker.o : Marker.x;

/**
 * Accepts a board and returns an array indices representing the "allowed" moves (moves that have not
 * been made) for the board. For example, a board such as: 
 *  [
 *    _,  _,  Marker.x, 
 *    Marker.x, Marker.o, _,
 *    Marker.o, Marker.x, _,
 *  ]
 * woould return [0, 1, 5, 8].
 * @param b - Board
 * @returns number[]
 */
export const getAllowedBoardMoves = (b: Board): number[] => b.map((m, idx) => m === _ ? idx : -1).filter(x => x !== -1);


/**
 * Minimax algorithm function for determining the optimal Tic-Tac-Toe move given the
 * current board state. The algorithm works by check first to see if the board is won, or 
 * is in a "terminal state", and returns the associated score. If neither of those conditions apply
 * then the board is recursed until each combination of possible moves has been played, and then score computed
 * for each state. The "best" found score is then returned. For more information, see this link for explanation
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
 * (One other quick note - since we cannot assume that the maximizer is always playing as "X" or "O", the final
 * parameter, "maximizingMarker" indicates which Marker the maximizer is playing as)
 * @param b - Board
 * @param number - depth
 * @param isMaximizer - boolean
 * @param maximizingMarker - Marker
 * @returns number[]
 */
export const minimax = (b: Board, depth: number, isMaximizer: boolean, maximizingMarker: Marker): number => {
  if (depth > b.length) {
    throw new Error(`Minimax depth cannot exceed board length: depth ${depth}`);
  }
  
  const score = evaluateBoard(b, maximizingMarker);

  // if maximizer / minimizer has won the game return score
  if (score !== 0) {
    return score;
  }

  // If game board is terminal then there is no winner so return 0
  if (isBoardTerminal(b)) {
    return 0;
  }

  // Define first best move to be -Inifinity so literally any move will have to be better than doing nothing.
  let best = isMaximizer ? -Infinity : Infinity;

  const allowedMoves = getAllowedBoardMoves(b)

  allowedMoves.forEach((idx) => {
    const updatedBoard = makeMove(
      b,
      { 
        position: idx,
        marker: isMaximizer ? maximizingMarker : toggleMarker(maximizingMarker),
      }
    );
    
    const childVal = minimax(updatedBoard, depth + 1, !isMaximizer, maximizingMarker);

    best = isMaximizer ? Math.max(best, childVal) : Math.min(best, childVal)
  });

  return best;
};

/**
 * Accepts a board and returns the Marker that needs to play next. This is done
 * by making a simple assumption (Marker.x always goes first), and by doing a count of
 * all X's and O's on the board. If the number of X's === O's, then it is the X's turn,
 * else if the O's count is less than the X's, it is the O's turn.
 * @param b - Board
 * @returns Marker
 */
export const determinePlayerMarker = (b: Board): Marker => {
  const xCount = b.filter((m) => m === Marker.x).length;
  const oCount = b.filter((m) => m === Marker.o).length;

  return xCount > oCount ? Marker.o : Marker.x;
}

/**
 * Main function to be called when wanting the make the next "optimal" Tic-Tac-Toe move.
 * The function works by first determining who's move it is, then for each possible move
 * it will run the minimax algorithm for that move / player, storing the best resulting score.
 * The move that corresponds with the highest score will be the selected move.
 * @param b - Board
 * @returns Board
 */
export const playBestMove = (b: Board): Board => {
  if (isBoardTerminal(b)) {
    return b;
  }
  
  // Determine which player's turn it is.
  const playerMarker = determinePlayerMarker(b);
  
  // Get the allowed moves for the board;
  const allowedMoves = getAllowedBoardMoves(b);

  // Default the bestMove to be the first allowed move.
  let bestMove = allowedMoves[0];
  let maxScore = -Infinity;

  // Iterate over each allowed move, place the move on the board, and then
  // call the minimax function with the updated board. 
  allowedMoves.forEach((m: number) => {
    const updatedBoard = makeMove(b, { position: m, marker: playerMarker });
    const moveScore = minimax(
      updatedBoard,
      0,
      false,
      playerMarker,
    );
    
    // If the score returned from minimax is better than our current best score,
    // then store it, and the move position.
    if (moveScore > maxScore) {
      maxScore = moveScore;
      bestMove = m;
    }
  });
  
  return makeMove(b, { position: bestMove, marker: playerMarker });
}

export const playRandomMove = (b: Board): Board => {
  if (isBoardTerminal(b)) {
    return b;
  }
  const playerMarker = determinePlayerMarker(b);
  const allowedMoves = getAllowedBoardMoves(b);
  const randomMove = allowedMoves[Math.floor(Math.random() * allowedMoves.length)];

  return makeMove(b, { position: randomMove, marker: playerMarker });
}

/**
 * Accepts a Board and returns the GameStatus by determining the
 * WinningLine and Winner if one exists.
 * @param board 
 * @returns GameStatus
 */
export const buildGameStatus = (board: Board): GameStatus => {
  // Determine winningLine if one exists
  const winningLine = determineWinningLine(board);
  
  // Determine winner if one exists 
  let winner: keyof typeof Winner | null = null;

  if (winningLine) {
    winner = tryGetWinningLineMarker(board, winningLine);
  } else if (isBoardTerminal(board)) {
    winner = Winner.tie;
  }
  
  // Return GameStatus
  return {
    board,
    winningLine: winningLine || undefined,
    winner,
  };
}