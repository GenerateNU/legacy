import React, { useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";

type AuthContextData = {
  user: FirebaseUser | null;
  createAccount: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
      setItemAsync("User", JSON.stringify(firebaseUser))
      console.log(firebaseUser)
    });
    loadStorageData();

    return unsubscribe;
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await getItemAsync("User");
      if (authDataSerialized) {
        const user: FirebaseUser = JSON.parse(authDataSerialized);
        setUser(user);
      }
    } catch (error) {
    } finally {
    }
  }

  const createAccount = async (username: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    setUser(undefined);
    await signOut(auth);
    await deleteItemAsync("User");
  };

  return (
    <AuthContext.Provider value={{ user, createAccount, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
