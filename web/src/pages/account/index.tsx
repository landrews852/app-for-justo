import {Routes, Route} from 'react-router-dom';
import Account from '../account/account/Account';

export const AccountRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<Account />} />
    </Routes>
  </>
);
