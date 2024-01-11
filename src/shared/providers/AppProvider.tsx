'use client';
import '@/services/config';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouter, MAX_STACK_NOTIFY } from '../constants';
import theme from '../themes';
import { getTokenFromLocalStorage } from '@/utils/auth';
import { redirect, usePathname } from 'next/navigation';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  useEffect(() => {
    const hasToken = !!getTokenFromLocalStorage();
    const shouldLogin = !hasToken && AppRouter.LOGIN !== pathname;

    if (shouldLogin) {
      redirect(AppRouter.LOGIN);
    }

    if (AppRouter.LOGIN === pathname) {
      redirect(AppRouter.INDEX);
    }
  }, []);

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
