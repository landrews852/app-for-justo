import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';

export default function NavbarForUnauthenticatedUser() {
  return (
    <>
      {/* <div className="sticky inset-x-0 top-0 bg-white justify-around flex flex-row py-2"> */}
      <div className={styles.nav}>
        <Link to="/login">
          <p className="text-xl font-bold">Inicio sesión</p>
        </Link>
        <Link to="/registro">
          <p className="text-xl font-bold">Registrarse</p>
        </Link>
      </div>
    </>
  );
}
