import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { DeckProvider } from './context/DeckContext';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DeckProvider>
        <App />
      </DeckProvider>
    </ThemeProvider>
  </StrictMode>
);