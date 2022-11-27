import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ChessProvider } from '../hooks/useChess';
import { InterfaceProvider } from '../hooks/useInterface';

import { COLORS } from '../styles/pallete';

import CustomSnackbarProvider from './CustomSnackbarProvider';

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

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <InterfaceProvider>
        <ChessProvider>
          <CustomSnackbarProvider>{children}</CustomSnackbarProvider>
        </ChessProvider>
      </InterfaceProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
