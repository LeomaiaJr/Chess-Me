import { StrictMode } from 'react';
import Chess from './components/Chess';
import { ChessProvider } from './hooks/useChess';

function App() {
  return (
    <StrictMode>
      <ChessProvider>
        <Chess />
      </ChessProvider>
    </StrictMode>
  );
}

export default App;
