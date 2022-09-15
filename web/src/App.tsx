import {BrowserRouter, Route, Routes} from 'react-router-dom';
// Import "./App.css";
import Navbar from './components/navbar/Navbar';
// Import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import ItemsList from './pages/items/crud/list/Items';
import UsersList from './pages/users/crud/list/Users';
import EmployeeList from './pages/employees/crud/list/Employees';
import UpdateItem from './pages/items/crud/update/UpdateItems';

export default function App() {
  return (
    // <BrowserRouter key={Math.random()}>
    <BrowserRouter>
      <div className="App h-screen w-screen">
        <Navbar />
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/assets" element={<ItemsList />} />
          <Route path="/trabajadores" element={<EmployeeList />} />
          <Route path="/home/:id" element={<UpdateItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
