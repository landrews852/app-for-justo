import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// Import "./App.css";
import NavbarForAuthenticatedUser from './components/navbar/NavbarForAuthenticatedUser';
import UsersList from './pages/users/crud/list/Users';
import {useMemo} from 'react';
import Register from './pages/account/register/Register';
import Login from './pages/account/login/Login';
import {AuthContextProvider} from './context/AuthContext';
import {AccountRoutes} from './pages/account';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import {ItemsRoutes} from './pages/items';
import {EmployeesRoutes} from './pages/employees';
import {StoresRoutes} from './pages/stores';
import ProtectedNavbar from './components/protectedRoute/ProtectedNavbar';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const {user} = UserAuth();

  // const navbar = () => {
  //   if (user) {
  //     <NavbarForAuthenticatedUser />;
  //   }

  //   <NavbarForUnauthenticatedUser />;
  // };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    // <BrowserRouter key={Math.random()}>
    <div className="w-full h-full">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthContextProvider>
            <ProtectedNavbar>
              <NavbarForAuthenticatedUser />
            </ProtectedNavbar>
            <Routes>
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AccountRoutes />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/articulos/*"
                element={
                  <ProtectedRoute>
                    <ItemsRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/empleados/*"
                element={
                  <ProtectedRoute>
                    <EmployeesRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bodegas/*"
                element={
                  <ProtectedRoute>
                    <StoresRoutes />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/store/:_id" element={<StoreDetail />} />
            <Route path="/store/:_id/edit" element={<StoreDetailEdit />} /> */}
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
