import { Chess, Move } from 'chess.js';
import { createContext } from 'react';
import { GameData, ChessNodes, PieceData } from '../@types/chess';

export interface ChessContextData {
  game: Chess;
  nodes: ChessNodes;

  gameData: GameData;

  movePiece: (move: Move) => void;

  selectedPiece: PieceData | null;
  setSelectedPiece: React.Dispatch<React.SetStateAction<PieceData | null>>;

  resetGame: () => void;
}

export const ChessContext = createContext<ChessContextData>(
  {} as ChessContextData
);
