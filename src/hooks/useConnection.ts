import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerGameData, SocketGameEvents } from '../@types/server';
import { getGameData } from '../infra/service';
import SnackbarUtils from '../utils/SnackbarUtils';
import { useChess } from './useChess';
import { useInterface } from './useInterface';

export const useConnection = () => {
  const { setGameData, setSelectedPiece, game } = useChess();
  const { setIsLoadingGameData, setPlayersConnected, playerName } =
    useInterface();

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (socket.current === null) {
      const apiBaseUrl = 'https://chess-me-server.leomaiajr.dev';
      const socketUrl = apiBaseUrl.replace('https', 'ws');

      socket.current = io(socketUrl);

      socket.current.on(SocketGameEvents.GAME_DATA, (data: ServerGameData) => {
        setPlayersConnected(data.playersConnected);

        setSelectedPiece(null);
        game.load(data.chessFen);
        setGameData({
          deadPieces: data.deadPieces,
          squares: data.squares,
        });

        if (playerName === data.lastMove?.playerName)
          SnackbarUtils.success(`${playerName} made a move!`);
        else SnackbarUtils.info(`${data.lastMove?.playerName} made a move!`);
      });
    }

    getGameData()
      .then((data) => {
        setPlayersConnected(data.playersConnected);
        setIsLoadingGameData(false);
        game.load(data.chessFen);
        setGameData({
          deadPieces: data.deadPieces,
          squares: data.squares,
        });
      })
      .catch(() => {
        SnackbarUtils.error(
          'Failed to retrieve data from the server, Leo probably messed up again'
        );
      });
  }, []);
};
