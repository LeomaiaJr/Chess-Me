import { Chess, Square } from 'chess.js';
import { GameData, Piece, PieceData } from '../@types/chess';
import {
  DEFAULT_PIECE_Y,
  PIECES_ALIAS,
  SQUARE_SIZE,
  SQUARE_TO_VECTOR_DATA,
} from '../constants/chess';

export const getAppPiecesData = (): GameData => {
  const rawBoard = [...new Chess().board()] as any[][];

  rawBoard.forEach((row, rowIndex) => {
    if ([0, 1, 6, 7].includes(rowIndex)) {
      row.forEach((piece) => {
        if (piece) {
          const pieceIndex = row.indexOf(piece);
          row[pieceIndex] = {
            ...row[pieceIndex],
            piece: PIECES_ALIAS[piece.type],
            id: `${piece.type}_${piece.color}_${pieceIndex}`,
          };
        }
      });
    }
  });

  return {
    squares: rawBoard,
    deadPieces: [],
  };
};

export const getAllPiecesData = (gameData: GameData): PieceData[] =>
  gameData.squares.flat().filter((piece) => piece !== null) as PieceData[];

export const squareToVector = (
  square: Square,
  piece: Piece
): [number, number, number] => {
  const [x, y] = square.split('');

  return [
    SQUARE_SIZE * (SQUARE_TO_VECTOR_DATA as any)[x],
    piece === 'queen' ? 215 : DEFAULT_PIECE_Y,
    -SQUARE_SIZE * (SQUARE_TO_VECTOR_DATA as any)[y],
  ];
};
