import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../../../components/buttons/Button';
import {UserAuth} from '../../../context/AuthContext';

const Account = () => {
  // const [name, setName] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const {user, logout} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logout();
      navigate('/');
      console.log('Te has desconectado.');
    } catch (error) {
      setError(error);
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Tu cuenta</h1>
      <p>Correo del usuario: {user?.email}</p>
      <Button
        variant=""
        text="Desconectarse"
        className="m-2 mt-8 font-bold hover:border-red-500 hover:text-red-500 active:border-red-600 active:text-red-600 focus:outline-none"
        onClick={handleLogout}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Account;
