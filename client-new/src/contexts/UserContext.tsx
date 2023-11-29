import { IUser } from '@/interfaces/IUser';
import {
  createUserAndProfile,
  fetchUserByFirebaseID
} from '@/services/UserService';
import { auth } from '@/utils/firebase';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import {
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import React, { useContext, useEffect, useState } from 'react';

import { deleteItem, getItem, setItem } from '../utils/SecureStoreUtils';
import { useProfile } from './ProfileContext';
import { Use } from 'react-native-svg';

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      await deleteItemAsync('firebaseUser');
      await deleteItemAsync('completedOnboarding');
      await deleteItemAsync('user');

      if (user) {
        // If there's a Firebase user, update state and fetch user data
        setFirebaseUser(user);
        // setItemAsync('firebaseUser', JSON.stringify(user));

        // Fetch user data based on Firebase UID
        const userData = await fetchUserByFirebaseID(user.uid);
        setUser(userData.data);
        // setItemAsync('user', JSON.stringify(userData.data));
      } else {
        // If no user (logged out), load user data from storage
        // const loadedFirebaseUser = await getItemAsync('firebaseUser');
        // const loadedUser = await getItemAsync('user');

        // if (loadedFirebaseUser && loadedUser) {
        //   setFirebaseUser(JSON.parse(loadedFirebaseUser));
        //   setUser(JSON.parse(loadedUser));
        // }
      }
    });

    loadStorageData(); // Load other stored data

    return () => unsubscribe();
  }, []); // Dependency array is empty to run only once on mount


  const loadStorageData = async (): Promise<void> => {
    try {
      // const loadedFirebaseUser = await getItem<FirebaseUser>("firebaseUser");
      // const loadedUser = await getItem<IUser>("user");
      // const loadedOnboardingStatus = await getItem<boolean>("onboardingStatus");

      // const firebaseUserSeralized = await getItemAsync('firebaseUser');
      // const userSeralized = await getItemAsync('user');

      // if (!firebaseUserSeralized || !userSeralized) {
      //   return;
      // }

      // const loadedFirebaseUser: FirebaseUser = JSON.parse(
      //   firebaseUserSeralized
      // );
      // const loadedUser: IUser = JSON.parse(userSeralized);

      // console.log('[user context] loaded user', loadedUser);
      // setUser(loadedUser);
      // setFirebaseUser(loadedFirebaseUser);
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  };

  const createAccount = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<Error> => {
    let firebaseUserCredential: UserCredential;
    try {
      firebaseUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setFirebaseUser(firebaseUserCredential.user);
      // setItemAsync('firebaseUser', JSON.stringify(firebaseUserCredential.user));
    } catch (error) {
      console.error('Error creating account:', error);

      if (error.code === 'auth/email-already-in-use') {
        return new Error('Email already in use');
      }

      if (error.code === 'auth/invalid-email') {
        return new Error('Invalid email');
      }

      if (error.code === 'auth/weak-password') {
        return new Error('Weak password');
      }

      return error;
    }

    try {
      const newUser = await createUserAndProfile({
        username: fullName,
        email: email,
        password: password,
        firebase_id: firebaseUserCredential.user.uid
      });

      console.log('[user context] newUser', newUser.data);

      setUser(newUser.data);
      // setItemAsync('user', JSON.stringify(newUser.data));
    } catch (error) {
      return new Error('Something went wrong');
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

      console.log('[user context] firebaseUserCredential', firebaseUserCredential);

      setFirebaseUser(firebaseUserCredential.user);
      // setItemAsync('firebaseUser', JSON.stringify(firebaseUserCredential.user));
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.code === 'auth/invalid-email') {
        return new Error('Invalid email');
      }

      if (error.code === 'auth/user-disabled') {
        return new Error('User disabled');
      }

      if (error.code === 'auth/user-not-found') {
        return new Error('User not found');
      }

      if (error.code === 'auth/wrong-password') {
        return new Error('Wrong password');
      }

      return error;
    }

    try {
      console.log('[user context] firebaseUserId', firebaseUser.uid)
      const user = await fetchUserByFirebaseID(firebaseUser.uid);

      console.log('[user context] user', user);
      setUser(user.data);
      // setItemAsync('user', JSON.stringify(user.data));
    } catch (error) {
      return new Error('Something went wrong');
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
