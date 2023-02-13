import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '../../../components/buttons/Button';
import {UserAuth} from '../../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string>('');
  const [problem, setProblem] = useState<string>('');

  const navigate = useNavigate();

  const {createUser} = UserAuth();

  // const handleSubmit = async (e: {preventDefault: () => void}) => {
  //   e.preventDefault();
  //   setError('');
  //   setProblem('');
  //   try {
  //     if (password === repeatPassword) {
  //       setProblem('');
  //       await createUser(email, password);
  //       navigate('/');
  //     } else {
  //       setProblem('Tus contraseñas no coinciden');
  //     }
  //   } catch (e: unknown) {
  //     setError(e.message);
  //     const newError: string = error?.toString();
  //     if (newError.includes('already-in-use')) console.log(error);
  //     return typeof error;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProblem('');
    try {
      if (password === repeatPassword) {
        setProblem('');
        await createUser(email, password);
        navigate('/');
      } else {
        setProblem('Tus contraseñas no coinciden');
      }
    } catch (error: unknown) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está en uso.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil.');
          break;
        default:
          setError(
            'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
          );
          break;
      }
    }
  };

  useEffect(() => {
    if (password.length < 7) {
      setProblem('Tu contraseña debe ser mayor a 6 carácteres');
      setDisabled(true);
    }

    if (repeatPassword.length < 7) {
      setProblem('Tu contraseña debe ser mayor a 6 carácteres');
      setDisabled(true);
    } else {
      setProblem('');
      setDisabled(false);
    }
  }, [password, repeatPassword, error]);

  return (
    <div>
      <form
        className="flex flex-col max-w-[400px] mx-auto px-4 border my-24"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold py-4">Regístrate</h1>
        <p className="mb-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="underline">
            Ingresa aquí.
          </Link>
        </p>
        {problem && <p className="text-red-400 text-center">{problem}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="w-full my-4">
          <p>Correo</p>
          <input
            className="w-full"
            type="email"
            autoComplete="false"
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
            autoComplete="false"
            placeholder="*********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="w-full mt-4">
          <p>Repite tu contraseña</p>
          <input
            className="w-full"
            autoComplete="false"
            type="password"
            placeholder="*********"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </div>
        <Button
          disabled={disabled}
          type="submit"
          text="Registrarse"
          className="my-8 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default Register;
