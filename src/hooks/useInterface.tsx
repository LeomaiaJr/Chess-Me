import React, { useContext, useEffect, useState } from 'react';
import { EnvironmentPresets } from '../@types/interface';
import {
  InterfaceContext,
  InterfaceContextData,
} from '../contexts/useInterface';
import { LastMoveData, ServerGameData } from '../@types/server';

interface InterfaceProviderProps {
  children: React.ReactNode;
}

const InterfaceProvider = ({ children }: InterfaceProviderProps) => {
  const [showStats, setShowStats] = useState(false);
  const [showPlayerIcons, setShowPlayerIcons] = useState(true);

  const [isCameraMoving, setIsCameraMoving] = useState(false);
  const [isLoadingGameData, setIsLoadingGameData] = useState(true);

  const [environmentPreset, setEnvironmentPreset] = useState(
    EnvironmentPresets.LEOS_CUSTOM
  );

  const [leosSecret, setLeosSecret] = useState<string | undefined>();
  const [playerName, setPlayerName] = useState(
    localStorage.getItem('chessme:playerName')
  );

  const [lastMoveData, setLastMoveData] = useState<LastMoveData>();

  const [playersConnected, setPlayersConnected] = useState(0);

  useEffect(() => {
    if (playerName) localStorage.setItem('chessme:playerName', playerName);
  }, [playerName]);

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
        playerName,
        setPlayerName,
        isLoadingGameData,
        setIsLoadingGameData,
        playersConnected,
        setPlayersConnected,
        lastMoveData,
        setLastMoveData,
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
