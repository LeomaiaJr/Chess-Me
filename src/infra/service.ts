import { Move } from 'chess.js';
import { ServerGameData, ServerMovement, ServerRoutes } from '../@types/server';
import { api } from './api';

export const makeMovement = async (move: ServerMovement) => {
  await api.post(ServerRoutes.MOVE, move);
};

export const getGameData = async (): Promise<ServerGameData> => {
  const { data } = await api.get(ServerRoutes.GAME_DATA);

  return data;
};
