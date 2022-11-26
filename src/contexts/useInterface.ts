import { createContext } from 'react';
import { EnvironmentPresets } from '../@types/interface';

export interface InterfaceContextData {
  showStats: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;

  environmentPreset: EnvironmentPresets;
  setEnvironmentPreset: React.Dispatch<
    React.SetStateAction<EnvironmentPresets>
  >;
}

export const InterfaceContext = createContext<InterfaceContextData>(
  {} as InterfaceContextData
);
