// import {gql, useMutation} from '@apollo/client';

// const LOGIN_MUTATION = gql`
//   mutation LoginMutation($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;
import {useState} from 'react';
import {Button} from '../../../components/buttons/Button';
import {Link, useNavigate} from 'react-router-dom';
import {UserAuth} from '../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {login} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/cuenta');
      console.log('Has ingresado como', email);
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <p>Contraseña</p>
          <input
            className="w-full"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button text="Ingresar" className="my-8 focus:outline-none" />
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Login;
