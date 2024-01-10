import theme from '@/shared/themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'this app was build for test api using golang!!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </html>
  );
}
