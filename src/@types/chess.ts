import { PieceSymbol, Square } from 'chess.js';
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

export type Piece = 'pawn' | 'rook' | 'bishop' | 'knight' | 'queen' | 'king';
export type Color = 'b' | 'w';

export type Position = [number, number];

export interface PieceData {
  square: Square;
  piece: Piece;
  color: Color;
  id: string;
  type?: PieceSymbol;
}

export interface GameData {
  squares: (PieceData | null)[][];
  deadPieces: PieceData[];
}
