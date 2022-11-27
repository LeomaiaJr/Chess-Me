import { StrictMode } from 'react';
import UserInterface from './components/UI/UserInterface';
import { useConnection } from './hooks/useConnection';
import AppProvider from './providers';

function App() {
  useConnection();

  return (
    <StrictMode>
      <AppProvider>
        <UserInterface />
        {/* <Chess /> */}
      </AppProvider>
    </StrictMode>
  );
}

export default App;
