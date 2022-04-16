export const _ = null;

export enum Difficulty {
  easy = 'easy',
  hard = 'hard',
}

export enum Marker {
  o = 'o',
  x = 'x',
}

export enum Player {
  computer = 'computer',
  human = 'human',
}

export const Winner = { ...Marker, tie: 'tie' } as const;

/**
   Game Board is represented by an Array of size 9 containing elements of type (Marker | typeof _)
   0  1  2
   3  4  5
   6  7  8
 */

// Set of all indices that make up a row on the board
export const rowIndices = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
];

// Set of all indices that make up a column on the board
export const colIndices = [
  [0,3,6],
  [1,4,7],
  [2,5,8],
];

// Set of all indices that make up a diagonal on the board
export const diagIndices = [
  [0,4,8],
  [2,4,6],
];