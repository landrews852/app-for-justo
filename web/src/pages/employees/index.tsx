import {Routes, Route} from 'react-router-dom';
import EmployeeDetail from './crud/list/EmployeeDetail';
import EmployeesDataTable from './crud/list/Employees';
import EmployeeEdit from './crud/update/EmployeeEdit';

export const EmployeesRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<EmployeesDataTable />} />
      <Route path="/:_id" element={<EmployeeDetail />} />
      <Route path="/:_id/edit" element={<EmployeeEdit />} />
    </Routes>
  </>
);
