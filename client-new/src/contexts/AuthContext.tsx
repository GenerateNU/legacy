import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

type AuthContextData = {
  user: FirebaseUser | null;
  createAccount: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>
};

type AuthProviderProps = {
  children?: React.ReactNode;
};
const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const createAccount = async (username: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(user);

    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async() => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, createAccount, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  };
