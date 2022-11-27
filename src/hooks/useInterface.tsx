import React, { useContext, useState } from 'react';
import { EnvironmentPresets } from '../@types/interface';
import {
  InterfaceContext,
  InterfaceContextData,
} from '../contexts/useInterface';

interface InterfaceProviderProps {
  children: React.ReactNode;
}

const InterfaceProvider = ({ children }: InterfaceProviderProps) => {
  const [showStats, setShowStats] = useState(false);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);

  const [isCameraMoving, setIsCameraMoving] = useState(false);

  const [environmentPreset, setEnvironmentPreset] = useState(
    EnvironmentPresets.LEOS_CUSTOM
  );

  const [leosSecret, setLeosSecret] = useState<string | undefined>();

  return (
    <InterfaceContext.Provider
      value={{
        showStats,
        setShowStats,
        showPlayerIcons,
        setShowPlayerIcons,
        environmentPreset,
        setEnvironmentPreset,
        isCameraMoving,
        setIsCameraMoving,
        leosSecret,
        setLeosSecret,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

function useInterface(): InterfaceContextData {
  const context = useContext(InterfaceContext);

  if (!context) {
    throw new Error('useInterface must be used within ScreenLoadingProvider');
  }

  return context;
}

export { InterfaceProvider, useInterface };
