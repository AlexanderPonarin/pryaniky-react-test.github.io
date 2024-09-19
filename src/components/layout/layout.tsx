import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Navigation, Session } from '@toolpad/core';
import { Home, TableRows } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/redux/hooks';
import { setTokenStatus } from '../../store/redux/slices/auth';
import { useMediaQuery } from '@mui/material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Главная',
  },
  {
    segment: '',
    title: 'Разделы',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Документы',
  },
  {
    segment: 'documents',
    title: 'Главная',
    icon: <Home />,
  },
  {
    segment: 'documents/table',
    title: 'Таблица',
    icon: <TableRows />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        ml: { sx: '20px', sm: '10px' },
      }}
    >
      <Outlet />
    </Box>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const [pathname, setPathname] = React.useState(currentPath ? currentPath : '/');
  const userName = window.localStorage.getItem('username');
  const dispatch = useAppDispatch();
  const matchesShowTitleLayout = useMediaQuery('(min-width: 450px)');

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: userName ? userName : 'User',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: session ? session?.user?.name : 'User',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        dispatch(setTokenStatus(null));
      },
    };
  }, []);

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  React.useEffect(() => {
    navigate(pathname);
  }, [pathname]);

  React.useEffect(() => {
    setPathname(currentPath);
  }, [currentPath]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      session={session}
      authentication={authentication}
      branding={{
        logo: <img src="/svg/logo.svg" width={60} alt="logo" />,
        title: matchesShowTitleLayout ? 'ДОКУМЕНТЫ' : '',
      }}
    >
      <DashboardLayout>
        <PageContent />
      </DashboardLayout>
    </AppProvider>
  );
}
