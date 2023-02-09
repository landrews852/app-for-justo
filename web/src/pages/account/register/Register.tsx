import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '../../../components/buttons/Button';
import {UserAuth} from '../../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {createUser} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/cuenta');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col max-w-[400px] mx-auto px-4 border my-24"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold py-4">Regístrate</h1>
        <p className="mb-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/registrarse" className="underline">
            Ingresa aquí.
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
        <Button
          type="submit"
          text="Ingresar"
          className="my-8 focus:outline-none"
        />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
