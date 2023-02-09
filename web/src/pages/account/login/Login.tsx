// import {gql, useMutation} from '@apollo/client';

// const LOGIN_MUTATION = gql`
//   mutation LoginMutation($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;
import {useState} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Button} from '../../../components/buttons/Button';
import {Link} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form
        className="flex flex-col max-w-[400px] mx-auto px-4 border my-24"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold py-4">Ingresa a tu cuenta</h1>
        <p className="mb-4">
          ¿No tienes una cuenta?{' '}
          <Link to="/cuenta/registro" className="underline">
            Regístrate aquí.
          </Link>
        </p>
        <div className="w-full my-4">
          <p>Nombre de usuario / Correo</p>
          <input
            className="w-full"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <p>Contraseña</p>
          <input
            className="w-full"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          type="submit"
          text="Ingresar"
          className="my-8 focus:outline-none"
        />
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Login;
