import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';

export default function NavbarForAuthenticatedUser() {
  return (
    <>
      {/* <div className="sticky inset-x-0 top-0 bg-white justify-around flex flex-row py-2"> */}
      <div className={styles.nav}>
        <Link to="/">
          <p className="text-xl font-bold">Usuario</p>
        </Link>
        <Link to="/articulos">
          <p className="text-xl font-bold">Artículos</p>
        </Link>
        <Link to="/empleados">
          <p className="text-xl font-bold">Empleados</p>
        </Link>
        <Link to="/bodegas">
          <p className="text-xl font-bold">Bodegas</p>
        </Link>
      </div>
    </>
  );
}
