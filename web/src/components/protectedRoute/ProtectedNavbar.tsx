import {UserAuth} from '../../context/AuthContext';
import NavbarForUnauthenticatedUser from '../navbar/NavbarForUnauthenticatedUser';

const ProtectedNavbar = ({children}) => {
  const {user} = UserAuth();

  if (!user) {
    return <NavbarForUnauthenticatedUser />;
  }

  return children;
};

export default ProtectedNavbar;
