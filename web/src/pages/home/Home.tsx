import {Route, Routes} from 'react-router-dom';
import {AuthContextProvider} from '../../context/AuthContext';
import Account from '../account/account/Account';
import Login from '../account/login/Login';
import Register from '../account/register/Register';

export default function Home() {
  return (
    <>
      <h1 className="my-10 text-center">Home</h1>
      <Login />
    </>
  );
}
