import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Import "./App.css";
import Navbar from './components/navbar/Navbar';
// Import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import UsersList from './pages/users/crud/list/Users';
import ItemsDataTable from './pages/items/crud/list/Items';
import ItemDetail from './pages/items/crud/list/ItemDetail';
import ItemEdit from './pages/items/crud/update/itemEdit';
import {useMemo} from 'react';
import EmployeeDataTable from './pages/employees/crud/list/Employees';
import StoresDataTable from './pages/stores/crud/list/Stores';

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
            <Route path="/articulos" element={<ItemsDataTable />} />
            <Route path="/articulos/:_id" element={<ItemDetail />} />
            <Route path="/articulos/:_id/edit" element={<ItemEdit />} />
            <Route path="/empleados" element={<EmployeeDataTable />} />
            {/* <Route path="/empleados/:_id" element={<EmployeeDetail />} />
            <Route path="/empleados/:_id/edit" element={<EmployeeDetailEdit />} /> */}
            <Route path="/bodegas" element={<StoresDataTable />} />
            {/* <Route path="/store/:_id" element={<StoreDetail />} />
            <Route path="/store/:_id/edit" element={<StoreDetailEdit />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
