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

import { IUser } from "../interfaces/IUser";
import { signIn, signUp } from "../services/AuthService";

type UserContextData = {
  user: IUser | null;
  firebaseUser: FirebaseUser | null;
  createAccount: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  completedOnboarding: boolean;
};

type UserProviderProps = {
  children?: React.ReactNode;
};
const UserContext = React.createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser>(null);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setFirebaseUser(firebaseUser);
      setItemAsync("firebaseUser", JSON.stringify(firebaseUser));
      console.log(firebaseUser);
    });

    loadStorageData();

    return unsubscribe;
  }, []);

  const loadStorageData = async (): Promise<void> => {
    try {
      const authDataSerialized = await getItemAsync("firebaseUser");
      if (authDataSerialized) {
        const user: FirebaseUser = JSON.parse(authDataSerialized);
        setFirebaseUser(user);
      }
    } catch (error) {
      console.log("Couldn't get firebase information");
    }

    try {
      const onboarding_status_serialized = await getItemAsync(
        "onboardingStatus"
      );
      if (onboarding_status_serialized) {
        const onboarding_status = JSON.parse(onboarding_status_serialized);
        setCompletedOnboarding(onboarding_status);
      }
    } catch (error) {
      console.log("Couldn't get onboarding status");
    }

    try {
      const user_seralized = await getItemAsync("user");
      if (user_seralized) {
        const user = JSON.parse(user_seralized);
        setUser(user);
      }
    } catch (error) {
      console.log("Couldn't get user informaiton");
      // maybe make a refetch to the endpoint?? TODO
    }
  };

  const createAccount = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("user firebase", firebaseUser);

      // FIGURE OUT PERSONA_ID and where it comes from
      console.log("user info", {
        username: username,
        email: email,
        password: password,
        firebase_id: firebaseUser.user.uid,
      });

      const user = await signUp({
        email: email,
        username: username,
        password: password,
        firebase_id: firebaseUser.user.uid,
      });

      console.log("signup success");

      setCompletedOnboarding(false);
      setItemAsync("onboardingStatus", JSON.stringify(completedOnboarding));
      setUser(user);
      setItemAsync("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.log("User Signup Failed");
      return error;
    }
  };

  const login = async (username: string, password: string) => {
    console.log("username", username);
    console.log("password", username);
    try {
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      signIn(username, password, firebaseUser.user.uid);
      return true;
    } catch (error) {
      console.log("Error");
      return error;
    }
  };

  const logout = async () => {
    setFirebaseUser(undefined);
    setCompletedOnboarding(undefined);
    setUser(undefined);
    await signOut(auth);
    await deleteItemAsync("firebaseUser");
    await deleteItemAsync("onboardingStatus");
    await deleteItemAsync("user");
  };

  return (
    <UserContext.Provider
      value={{
        firebaseUser,
        completedOnboarding,
        user,
        createAccount,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};
