import {createContext, useContext, useEffect, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@firebase/auth';
import {auth} from '../firebase';
import {Password} from '@mui/icons-material';

type NewUser = {
  email: string;
  password: string;
  UserCredential: any;
};

const UserContext = createContext({});

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = async () => signOut(auth);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{createUser, user, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => useContext(UserContext);
