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
import { signIn, signUp } from "../services/authService";

type AuthContextData = {
  user: FirebaseUser | null;
  createAccount: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  // completedOnboarding: boolean;
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
      setItemAsync("User", JSON.stringify(firebaseUser));
      console.log(firebaseUser);
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

  async function createAccount(
    username: string,
    email: string,
    password: string
  ) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      console.log("user firebase", user);

      // FIGURE OUT PERSONA_ID and where it comes from
      console.log("user info", {
        username: username,
        email: email,
        password: password,
        firebase_id: user.user.uid,
      });

      const data = await signUp({
        email: email,
        username: username,
        password: password,
        firebase_id: user.user.uid,
      });
      console.log("user signup didnt fail");
      return true;
    } catch (error) {
      console.log("User Signup Failed");
      return error;
    }
  }

  const login = async (username: string, password: string) => {
    console.log("username", username);
    console.log("password", username);
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      signIn(username, password, user.user.uid);
      return true;
    } catch (error) {
      console.log("Error");
      return error;
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
