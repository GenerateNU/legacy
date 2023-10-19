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
      const user = await createUserWithEmailAndPassword(auth, username, password);

      console.log(user);

      // very ugly code
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: 'password',
          email: user.user.email,
          persona_id: 1,
          firebase_id: user.user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('test', data);

      // this should probably be in the login function
      const profileResponse = await fetch(`http://localhost:8080/api/profiles/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.user.email.split('@')[0]
        }),
      });

      const profileData = await profileResponse.json();
      console.log('test', profileData);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };


  const login = async (username: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);

      const response = await fetch(`http://localhost:8080/api/users/firebase/${user.user.uid}`);

      response.json().then((data) => {
        console.log(data);
      });

      const data = await response.json();
      console.log('test', data);

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
