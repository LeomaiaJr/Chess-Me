import { Move } from 'chess.js';
import { PieceData } from './chess';

export enum SocketGameEvents {
  GAME_DATA = 'game-data',
}

export enum ServerRoutes {
  GAME_DATA = 'game-data',
  MOVE = 'move',
}

export interface ServerAuth {
  leosSecret?: string;
}

export interface ServerGameData {
  chessFen: string;
  squares: (PieceData | null)[][];
  deadPieces: PieceData[];

  lastMove?: {
    playerName: string;
    date: string;
  };
  score: {
    white: number;
    black: number;
  };

  playersConnected: number;
}

export interface ServerMovement extends ServerAuth {
  move: Move;
  playerName: string;
}
