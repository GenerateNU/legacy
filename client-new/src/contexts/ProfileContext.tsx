import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { IProfile } from "../interfaces/IProfile";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { getProfile, updateProfile } from "../services/ProfileService";
import { useUser } from "./UserContext";

type ProfileContextData = {
  profile: IProfile | null;
  updateName: (newName: string) => void;
  updateDOB: (newDOB: Date) => void;
  updateNumber: (newNumber: number) => void;
};

type ProfileProviderProps = {
  children?: React.ReactNode;
};

const ProfileContext = React.createContext<ProfileContextData>(
  {} as ProfileContextData
);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState<IProfile>(null);
  const { user } = useUser();

  // on component load, it will either fetch
  useEffect(() => {
    console.log("CALL");
    const fetchProfile = async (user_id) => {
      const profile = await getProfile(user_id);
      setProfile(profile);
    };

    if (user) {
      fetchProfile(user.id);
      setItemAsync("profile", JSON.stringify(profile));
      loadStorageData();
    }
  }, []);

  const updateName = (newName: string) => {
    setProfile({ ...profile, name: newName });
    updateProfile(profile, profile.id);
    setItemAsync("profile", JSON.stringify(profile));
  };

  const updateDOB = (newDOB: Date) => {
    setProfile({ ...profile, dateOfBirth: newDOB });
    updateProfile(profile, profile.id);
    setItemAsync("profile", JSON.stringify(profile));
  };

  const updateNumber = (newNumber: number) => {
    setProfile({ ...profile, phoneNumber: newNumber });
    updateProfile(profile, profile.id);
    setItemAsync("profile", JSON.stringify(profile));
  };

  const loadStorageData = async (): Promise<void> => {
    try {
      const profileSeralized = await getItemAsync("profile");
      if (profileSeralized) {
        const profile: IProfile = JSON.parse(profileSeralized);
        setProfile(profile);
      }
    } catch (error) {
      console.log("Couldn't get firebase information");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateName,
        updateDOB,
        updateNumber,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextData => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }

  return context;
};
