'use client';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from '../themes';
import '@/services/config';
import { SnackbarProvider } from 'notistack';
import { MAX_STACK_NOTIFY } from '../constants';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider maxSnack={MAX_STACK_NOTIFY} autoHideDuration={1500}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SnackbarProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};
