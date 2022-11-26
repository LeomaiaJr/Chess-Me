import { StrictMode } from 'react';
import Chess from './components/Chess';
import UserInterface from './components/UI/UserInterface';
import { ChessProvider } from './hooks/useChess';
import { InterfaceProvider } from './hooks/useInterface';

function App() {
  return (
    <StrictMode>
      <InterfaceProvider>
        <ChessProvider>
          <UserInterface />
          <Chess />
        </ChessProvider>
      </InterfaceProvider>
    </StrictMode>
  );
}

export default App;
