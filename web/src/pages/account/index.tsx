import {Route, Routes} from 'react-router-dom';
import {AuthContextProvider} from '../../context/AuthContext';
import Account from '../account/account/Account';
import Login from '../account/login/Login';
import Register from '../account/register/Register';

export const AccountRoutes = () => (
  <>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cuenta/registro" element={<Register />} />
      </Routes>
    </AuthContextProvider>
  </>
);
