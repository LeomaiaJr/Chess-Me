import { useGLTF } from '@react-three/drei';
import { Chess } from 'chess.js';
import React, { useContext, useMemo, useState } from 'react';
import { GameData, ChessNodes, PieceData } from '../@types/chess';
import { ChessContext, ChessContextData } from '../contexts/useChess';
import { getAppPiecesData } from '../utils/chess';

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

  return (
    <ChessContext.Provider
      value={{
        game,
        nodes: chessData.nodes as ChessNodes,
        gameData,
        setGameData,
        selectedPiece,
        setSelectedPiece,
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
