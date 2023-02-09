import {createContext, useContext} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@firebase/auth';
import {auth} from '../firebase';

const UserContext = createContext();

type NewUser = {
  email: string;
  password: string;
  UserCredential: any;
};

export const AuthContextProvider = ({children}) => {
  const createUser = async (email, password): Promise<NewUser> =>
    createUserWithEmailAndPassword(auth, email, password);

  return (
    <UserContext.Provider value={{createUser}}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => useContext(UserContext);
