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
  const [environmentPreset, setEnvironmentPreset] = useState(
    EnvironmentPresets.LEOS_CUSTOM
  );

  return (
    <InterfaceContext.Provider
      value={{
        showStats,
        setShowStats,
        environmentPreset,
        setEnvironmentPreset,
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
