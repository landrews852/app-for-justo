import {Routes, Route} from 'react-router-dom';
import StoreDetail from './crud/list/StoreDetail';
import StoresDataTable from './crud/list/Stores';

export const StoresRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<StoresDataTable />} />
      <Route path="/:_id" element={<StoreDetail />} />
      {/* <Route path="/:_id/edit" element={<StoreEdit />} /> */}
    </Routes>
  </>
);
