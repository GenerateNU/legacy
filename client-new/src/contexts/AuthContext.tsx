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
import { authService } from "../services/authService";

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
    fullName: string,
    username: string,
    password: string
  ) {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      // FIGURE OUT PERSONA_ID and where it comes from
      const data = await authService.signUp({
        full_name: fullName,
        username: username,
        password: password,
        persona_id: 1,
        firebase_id: user.user.uid,
      });
      console.log(data);
      return true;
    } 
    catch (error) {
      console.log("This is the ERROR: ", error);
      return error;
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      authService.signIn(username, password, user.user.uid);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
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
