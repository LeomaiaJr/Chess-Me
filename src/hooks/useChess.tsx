import { useGLTF } from '@react-three/drei';
import { Square } from 'chess.js';
import { Chess, Move } from 'chess.js';
import React, { useContext, useMemo, useState } from 'react';
import { GameData, ChessNodes, PieceData } from '../@types/chess';
import { ChessContext, ChessContextData } from '../contexts/useChess';
import { chessPositionToBoardPosition, getAppPiecesData } from '../utils/chess';

interface ChessProviderProps {
  children: React.ReactNode;
}

const ChessProvider = ({ children }: ChessProviderProps) => {
  const game = useMemo(() => {
    return new Chess();
  }, []);

  const chessData = useGLTF('/chess/chess.gltf');

  const [gameData, setGameData] = useState<GameData>(getAppPiecesData());
  const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null);

  const resetGame = () => {
    game.reset();
    setGameData(getAppPiecesData());
  };

  const movePiece = async (move: Move) => {
    const [fCol, fRow] = chessPositionToBoardPosition(move.from);
    const [tCol, tRow] = chessPositionToBoardPosition(move.to);

    const newGameData = { ...gameData };
    const prevGameData = { ...gameData };

    const squareData = newGameData.squares[fRow][fCol];

    if (move.captured !== undefined) {
      const capturedPiece = prevGameData.squares[tRow][tCol];
      prevGameData.squares[tRow][tCol] = null;
      setGameData((prev) => ({
        ...prev,
        deadPieces: [...prev.deadPieces, capturedPiece!],
      }));

      setSelectedPiece(null);

      await new Promise((resolve) => setTimeout(resolve, 500));
      newGameData.deadPieces.push(capturedPiece!);
    }

    prevGameData.squares[fRow][fCol] = null;
    newGameData.squares[tRow][tCol] = {
      ...squareData,
      square: move.to,
    } as PieceData;

    if (move.promotion !== undefined) {
      newGameData.squares[tRow][tCol] = {
        ...squareData,
        square: move.to,
        piece: 'queen',
        type: 'q',
      } as PieceData;
    }

    setSelectedPiece(null);
    setGameData(newGameData);
    game.move(move);
  };

  return (
    <ChessContext.Provider
      value={{
        game,
        nodes: chessData.nodes as ChessNodes,
        gameData,
        movePiece,
        selectedPiece,
        setSelectedPiece,
        resetGame,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

function useChess(): ChessContextData {
  const context = useContext(ChessContext);

  if (!context) {
    throw new Error('useChess must be used within ScreenLoadingProvider');
  }

  return context;
}

export { ChessProvider, useChess };
