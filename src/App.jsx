import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Users from './pages/Users';
import Settings from './pages/Settings';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyle';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-cneter"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
