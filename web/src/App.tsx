import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Import "./App.css";
import Navbar from './components/navbar/Navbar';
// Import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import ItemsList from './pages/items/crud/list/Items';
import UsersList from './pages/users/crud/list/Users';
import EmployeeList from './pages/employees/crud/list/Employees';
import ItemDetailEdit from './pages/items/crud/update/itemDetailEdit';
import ItemsTable from './pages/items/crud/list/itemstable';
import DataTable from './pages/items/crud/list/itemstablepaginated';
import {useMemo} from 'react';
import ItemDetail from './pages/items/crud/list/ItemDetail';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
    <div className="h-screen w-full">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/articulos" element={<DataTable />} />
            <Route path="/empleados" element={<EmployeeList />} />
            <Route path="/articulos/:_id" element={<ItemDetail />} />
            <Route path="/articulos/:_id/edit" element={<ItemDetailEdit />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
