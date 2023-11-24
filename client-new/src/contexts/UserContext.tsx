import { IUser } from '@/interfaces/IUser';
import {
  createUserAndProfile,
  fetchUserAndProfile
} from '@/services/UserService';
import { auth } from '@/utils/firebase';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import React, { useContext, useEffect, useState } from 'react';

import { deleteItem, getItem, setItem } from '../utils/SecureStoreUtils';

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
      setItemAsync('firebaseUser', JSON.stringify(user));
    });

    loadStorageData();

    return () => unsubscribe();
  }, []);

  const loadStorageData = async (): Promise<void> => {
    try {
      // const loadedFirebaseUser = await getItem<FirebaseUser>("firebaseUser");
      // const loadedUser = await getItem<IUser>("user");
      // const loadedOnboardingStatus = await getItem<boolean>("onboardingStatus");

      const firebaseUserSeralized = await getItemAsync('firebaseUser');
      const userSeralized = await getItemAsync('user');
      const onboardingStatusSeralized = await getItemAsync('onboardingStatus');

      if (
        !firebaseUserSeralized ||
        !userSeralized ||
        onboardingStatusSeralized === null
      ) {
        return;
      }

      const loadedFirebaseUser: FirebaseUser = JSON.parse(
        firebaseUserSeralized
      );
      const loadedUser: IUser = JSON.parse(userSeralized);
      const loadedOnboardingStatus: boolean = JSON.parse(
        onboardingStatusSeralized
      );

      console.log('LOADED USER', loadedUser);
      setUser(loadedUser);
      setFirebaseUser(loadedFirebaseUser);
      setCompletedOnboarding(loadedOnboardingStatus);
    } catch (error) {
      console.error('Error loading data from storage:', error);
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
        firebase_id: firebaseUserCredential.user.uid
      });

      console.log('newUser', newUser.data);

      setUser(newUser.data);
      setItemAsync('onboardingStatus', JSON.stringify(completedOnboarding));
      setItemAsync('user', JSON.stringify(newUser.data));
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean | Error> => {
    try {
      const firebaseUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user, profile } = await fetchUserAndProfile(
        firebaseUserCredential.user.uid
      );

      return user.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return error;
    }
  };

  const logout = async (): Promise<void> => {
    setFirebaseUser(null);
    setCompletedOnboarding(false);
    setUser(null);
    await signOut(auth);
    await deleteItemAsync('firebaseUser');
    await deleteItemAsync('onboardingStatus');
    await deleteItemAsync('user');
  };

  const contextValue: UserContextData = {
    user,
    firebaseUser,
    createAccount,
    login,
    logout,
    completedOnboarding
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
