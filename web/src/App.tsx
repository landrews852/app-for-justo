import {BrowserRouter, Route, Routes} from 'react-router-dom';
// Import "./App.css";
import Navbar from './components/navbar/Navbar';
// Import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import ItemsList from './pages/assets/crud/list/Items';
import UsersList from './pages/users/crud/list/Users';
import EmployeeList from './pages/employees/crud/list/Employees';
import AssetDetail from './pages/assets/assetDetail/assetDetail';
import ItemsTable from './pages/assets/crud/list/itemstable';
import DataTable from './pages/assets/crud/list/itemstablepaginated';

export default function App() {
  return (
    // <BrowserRouter key={Math.random()}>
    <BrowserRouter>
      <div className="h-full w-full pb-5">
        <Navbar />
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/assets" element={<DataTable />} />
          <Route path="/empleados" element={<ItemsTable />} />
          <Route path="/assets/:_id" element={<AssetDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
