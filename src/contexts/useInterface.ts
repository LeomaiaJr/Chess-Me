import { createContext } from 'react';
import { EnvironmentPresets } from '../@types/interface';

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
}

export const InterfaceContext = createContext<InterfaceContextData>(
  {} as InterfaceContextData
);
