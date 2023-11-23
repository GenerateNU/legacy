import React, { useEffect, useState, useCallback } from "react";
import { createContext, useContext } from "react";
import { IProfile } from "../interfaces/IProfile";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import {
  getProfile,
  insertOnboardingResponse,
  updateProfile,
} from "../services/ProfileService";
import { useUser } from "./UserContext";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";
import { getItem, setItem } from "../utils/SecureStoreUtils";

type ProfileContextData = {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  fetchProfile: (userID: number) => Promise<void>;
  completeOnboarding: (onboardingFlowState: IOnboardingFlowState) => Promise<void>;
  updateField: (
    field: "name" | "dateOfBirth" | "phoneNumber",
    value: string | Date | number
  ) => void;
};

type ProfileProviderProps = {
  children?: React.ReactNode;
};

const ProfileContext = createContext<ProfileContextData | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const { user } = useUser();

  const fetchProfile = useCallback(async (userID: number): Promise<void> => {
    try {
      const fetchedProfile = await getProfile(userID.toString());
      if (fetchedProfile) {
        setProfile(fetchedProfile);
        await setItem("profile", fetchedProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Handle error - show message or perform recovery action
    }
  }, []);


  const updateField = useCallback(
    async (
      field: "name" | "dateOfBirth" | "phoneNumber",
      value: string | Date | number
    ): Promise<void> => {
      if (!profile) return;

      const updatedProfile: IProfile = { ...profile, [field]: value };
      setProfile(updatedProfile);

      try {
        await updateProfile(updatedProfile, profile.id);
        await setItem("profile", updatedProfile);
      } catch (error) {
        console.error(`Error updating ${field} in profile:`, error);
        // Handle error - show message or perform recovery action
      }
    },
    [profile]
  );

  const completeOnboarding = useCallback(
    async (onboardingFlowState: IOnboardingFlowState): Promise<void> => {
      if (!profile) return;

      const updatedProfile = { ...profile, onboardingFlowState };
      setProfile(updatedProfile);

      try {
        await insertOnboardingResponse(updatedProfile.onboardingFlowState, user.id, profile.id);
        await setItem("profile", updatedProfile);
      } catch (error) {
        console.error(`Error updating onboardingFlowState in profile:`, error);
      // Handle error - show message or perform recovery action
      }
    },
    [profile]
  );

  const loadStorageData = useCallback(async (): Promise<void> => {
    try {
      const loadedProfile = await getItem<IProfile>("profile");
      setProfile(loadedProfile);
    } catch (error) {
      console.error("Error loading profile from storage:", error);
      // Handle error - show message or perform recovery action
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
      loadStorageData();
    }
  }, [user, fetchProfile, loadStorageData]);

  const contextValue: ProfileContextData = {
    profile,
    setProfile,
    completeOnboarding,
    fetchProfile,
    updateField,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextData => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
};