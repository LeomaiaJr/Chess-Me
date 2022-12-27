import { createContext } from 'react';
import { EnvironmentPresets } from '../@types/interface';
import { LastMoveData } from '../@types/server';

export interface InterfaceContextData {
  showStats: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;

  showPlayerIcons: boolean;
  setShowPlayerIcons: React.Dispatch<React.SetStateAction<boolean>>;

  environmentPreset: EnvironmentPresets;
  setEnvironmentPreset: React.Dispatch<
    React.SetStateAction<EnvironmentPresets>
  >;

  isCameraMoving: boolean;
  setIsCameraMoving: React.Dispatch<React.SetStateAction<boolean>>;

  leosSecret: string | undefined;
  setLeosSecret: React.Dispatch<React.SetStateAction<string | undefined>>;

  playerName: string | null;
  setPlayerName: React.Dispatch<React.SetStateAction<string | null>>;

  isLoadingGameData: boolean;
  setIsLoadingGameData: React.Dispatch<React.SetStateAction<boolean>>;

  playersConnected: number;
  setPlayersConnected: React.Dispatch<React.SetStateAction<number>>;

  lastMoveData: LastMoveData | undefined;
  setLastMoveData: React.Dispatch<undefined | LastMoveData>;
}

export const InterfaceContext = createContext<InterfaceContextData>(
  {} as InterfaceContextData
);
