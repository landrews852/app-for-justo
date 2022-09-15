import {Link} from 'react-router-dom';
import styles from './styles.module.css';

export default function Navbar() {
  return (
    <>
      {/* <div className="sticky inset-x-0 top-0 bg-white justify-around flex flex-row py-2"> */}
      <div className={styles.nav}>
        <Link to="/">
          <p className="text-xl font-bold">Inicio</p>
        </Link>
        <Link to="/users">
          <p className="text-xl font-bold">Usuarios</p>
        </Link>
        <Link to="/assets">
          <p className="text-xl font-bold">Items</p>
        </Link>
        <Link to="/trabajadores">
          <p className="text-xl font-bold">Trabajadores</p>
        </Link>
      </div>
    </>
  );
}
