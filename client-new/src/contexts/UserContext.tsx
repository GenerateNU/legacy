import React, { useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

import { IUser } from "../interfaces/IUser";
import { createUserAndProfile, fetchUserAndProfile } from "../services/UserService";
import { useProfile } from "./ProfileContext";
import { deleteItem, getItem, setItem } from "../utils/SecureStoreUtils";

type UserContextData = {
  user: IUser | null;
  firebaseUser: FirebaseUser | null;
  createAccount: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean | Error>;
  logout: () => Promise<void>;
  completedOnboarding: boolean;
};

type UserProviderProps = {
  children?: React.ReactNode;
};

const UserContext = React.createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setItem("firebaseUser", user);
    });

    loadStorageData();

    return () => unsubscribe();
  }, []);

  const loadStorageData = async (): Promise<void> => {
    try {
      const loadedFirebaseUser = await getItem<FirebaseUser>("firebaseUser");
      const loadedUser = await getItem<IUser>("user");
      const loadedOnboardingStatus = await getItem<boolean>("onboardingStatus");

      if (!loadedFirebaseUser || !loadedUser || loadedOnboardingStatus === null) {
        return;
      }

      setFirebaseUser(loadedFirebaseUser);
      setUser(loadedUser);
      setCompletedOnboarding(loadedOnboardingStatus);
    } catch (error) {
      console.error("Error loading data from storage:", error);
    }
  };

  const createAccount = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const firebaseUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { newUser } = await createUserAndProfile({
        username: fullName,
        email: email,
        password: password,
        firebase_id: firebaseUserCredential.user.uid,
      });

      setUser(newUser.data);
      setItem("onboardingStatus", completedOnboarding);
      setItem("user", newUser.data);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean | Error> => {
    try {
      const firebaseUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user, profile } = await fetchUserAndProfile(firebaseUserCredential.user.uid);

      return user.data;
    } catch (error) {
      console.error("Error logging in:", error);
      return error;
    }
  };

  const logout = async (): Promise<void> => {
    setFirebaseUser(null);
    setCompletedOnboarding(false);
    setUser(null);
    await signOut(auth);
    await deleteItem("firebaseUser");
    await deleteItem("onboardingStatus");
    await deleteItem("user");
  };

  const contextValue: UserContextData = {
    user,
    firebaseUser,
    createAccount,
    login,
    logout,
    completedOnboarding,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
