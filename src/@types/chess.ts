import { Object3D } from 'three';

type NodesType =
  | 'bishop_b'
  | 'bishop_w'
  | 'board'
  | 'board_edge'
  | 'king_b'
  | 'king_w'
  | 'knight_b'
  | 'knight_w'
  | 'pawn_b'
  | 'pawn_w'
  | 'queen_b'
  | 'queen_w'
  | 'rook_b'
  | 'rook_w';

export type ChessNodes = {
  [name in NodesType]: Object3D;
};