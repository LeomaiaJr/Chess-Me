import Chess from './components/Chess';
import UserInterface from './components/UI/UserInterface';
import AppProvider from './providers';

function App() {
  return (
    <AppProvider>
      <UserInterface />
      <Chess />
    </AppProvider>
  );
}

export default App;
