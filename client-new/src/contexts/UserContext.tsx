import { IUser } from '@/interfaces/IUser';
import {
  createUserAndProfile,
  fetchUser,
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
import { useProfile } from './ProfileContext';

type UserContextData = {
  user: IUser | null;
  firebaseUser: FirebaseUser | null;
  createAccount: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void | Error>;
  login: (email: string, password: string) => Promise<void | Error>;
  logout: () => Promise<void>;
};

type UserProviderProps = {
  children?: React.ReactNode;
};

const UserContext = React.createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setItemAsync('firebaseUser', JSON.stringify(user));
    });

    const getUser = async () => {
     const user = await fetchUser(firebaseUser?.uid)
      setUser(user.data)
    }

    if (firebaseUser) {
      getUser()
    }
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

      if (!firebaseUserSeralized || !userSeralized) {
        return;
      }

      const loadedFirebaseUser: FirebaseUser = JSON.parse(
        firebaseUserSeralized
      );
      const loadedUser: IUser = JSON.parse(userSeralized);

      console.log('LOADED USER', loadedUser);
      setUser(loadedUser);
      setFirebaseUser(loadedFirebaseUser);
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
      setItemAsync('user', JSON.stringify(newUser.data));
    } catch (error) {
      console.error('Error creating account:', error);
      return error;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<void | Error> => {
    try {
      const firebaseUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('firebaseUserCredential', firebaseUserCredential);
      
      const { user, profile } = await fetchUserAndProfile(
        firebaseUserCredential.user.uid
      );

      setUser(user.data);
    } catch (error) {
      console.error('Error logging in:', error);
      return error;
    }
  };

  const logout = async (): Promise<void> => {
    setFirebaseUser(null);
    setUser(null);
    await signOut(auth);
    await deleteItemAsync('firebaseUser');
    await deleteItemAsync('completedOnboarding');
    await deleteItemAsync('user');
  };

  const contextValue: UserContextData = {
    user,
    firebaseUser,
    createAccount,
    login,
    logout,
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
