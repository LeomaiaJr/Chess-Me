import { Color, Piece, PieceData } from '../@types/chess';

export const CHESS_PIECES = [
  'bishop_b',
  'bishop_w',
  'board',
  'board_edge',
  'king_b',
  'king_w',
  'knight_b',
  'knight_w',
  'pawn_b',
  'pawn_w',
  'queen_b',
  'queen_w',
  'rook_b',
  'rook_w',
];

export const PIECES_ALIAS: {
  [key: string]: Piece;
} = {
  p: 'pawn',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  q: 'queen',
  k: 'king',
};

export const SQUARE_TO_VECTOR_DATA = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  '1': 7,
  '2': 6,
  '3': 5,
  '4': 4,
  '5': 3,
  '6': 2,
  '7': 1,
  '8': 0,
} as const;

export const DEFAULT_PIECE_Y = 30;
export const SQUARE_SIZE = 250;

export const PIECE_MOV_SPEED = 0.08;
export const getYOffSet = (piece: PieceData) =>
  piece.piece === 'queen' ? 400 : 210;

export const STAND_POS = {
  b: {
    x: -1000,
    y: 280,
    z: -1435,
  },
  w: {
    x: 2750,
    y: 280,
    z: -1435,
  },
};
