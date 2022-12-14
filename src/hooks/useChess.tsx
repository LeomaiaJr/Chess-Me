import { useGLTF } from '@react-three/drei';
import { isAxiosError } from 'axios';
import { Chess, Move } from 'chess.js';
import React, { useContext, useMemo, useState } from 'react';
import { ChessNodes, GameData, PieceData } from '../@types/chess';
import { ChessContext, ChessContextData } from '../contexts/useChess';
import { makeMovement } from '../infra/service';
import { chessPositionToBoardPosition, getAppPiecesData } from '../utils/chess';
import SnackbarUtils from '../utils/SnackbarUtils';
import { useInterface } from './useInterface';

interface ChessProviderProps {
  children: React.ReactNode;
}

const ChessProvider = ({ children }: ChessProviderProps) => {
  const { leosSecret, playerName } = useInterface();

  const game = useMemo(() => {
    return new Chess();
  }, []);

  const chessData = useGLTF('/chess/chess.gltf');

  const [gameData, setGameData] = useState<GameData>(getAppPiecesData());
  const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null);

  const movePiece = async (move: Move) => {
    try {
      await makeMovement({
        move,
        leosSecret,
        playerName: playerName || '',
      });

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
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 403)
          SnackbarUtils.error('Error, only Leo can move the white pieces');
        else
          SnackbarUtils.error(
            'Error while making movement, please try again later'
          );
      } else {
        SnackbarUtils.error('Error while making movement');
      }
    }
  };

  return (
    <ChessContext.Provider
      value={{
        game,
        nodes: chessData.nodes as ChessNodes,
        gameData,
        setGameData,
        movePiece,
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
