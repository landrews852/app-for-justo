import {Route, Routes} from 'react-router-dom';
import ItemDetail from './crud/list/ItemDetail';
import ItemsDataTable from './crud/list/Items';
import ItemEdit from './crud/update/itemEdit';

export const ItemsRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<ItemsDataTable />} />
      <Route path="/:_id" element={<ItemDetail />} />
      <Route path="/:_id/edit" element={<ItemEdit />} />
    </Routes>
  </>
);
