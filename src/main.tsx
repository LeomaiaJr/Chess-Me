import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { COLORS } from './styles/pallete';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
