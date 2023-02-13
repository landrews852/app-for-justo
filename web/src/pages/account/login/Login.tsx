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
import {unlink} from '@firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {login} = UserAuth();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
      console.log('Has ingresado como', email);
    } catch (error: unknown) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('El correo electrónico es inválido');
          break;
        case 'auth/user-not-found':
          setError('El usuario no fue encontrado');
          break;
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta');
          break;
        default:
          setError('Ha ocurrido un error, por favor inténtalo de nuevo');
      }
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
          <Link to="/registro" className="underline">
            Regístrate aquí.
          </Link>
        </p>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="w-full my-4">
          <p>Correo</p>
          <input
            className="w-full"
            type="email"
            placeholder="ejemplo@getjusto.com"
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
            placeholder="*********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button text="Ingresar" className="my-8 focus:outline-none" />
      </form>
    </>
  );
};

export default Login;
