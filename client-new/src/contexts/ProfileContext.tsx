import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { IProfile } from '../interfaces/IProfile';
import {
  getProfile,
  insertOnboardingResponse,
  updateOnboardingToComplete,
  updateProfile
} from '../services/ProfileService';

type ProfileContextData = {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  completedOnboarding: boolean;
  setCompletedOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProfile: (userID: number) => Promise<void>;
  completeOnboarding: (
    onboardingFlowState: IOnboardingFlowState
  ) => Promise<void>;
  updateField: (
    field: 'name' | 'dateOfBirth' | 'phoneNumber',
    value: string | Date | number
  ) => void;
  toggleOnboarding: () => Promise<void>;
};

type ProfileProviderProps = {
  children?: React.ReactNode;
};

const ProfileContext = createContext<ProfileContextData | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children
}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [completedOnboarding, setCompletedOnboarding] = useState<boolean>(profile?.completed_onboarding_response || false);

  useEffect(() => {
    const updateLocalStorage = async (): Promise<void> => {
      if (profile) {
        console.log('[profile context] profile', profile)
        setCompletedOnboarding(profile.completed_onboarding_response)
        setProfile(profile);
        await setItemAsync('profile', JSON.stringify(profile));
        await setItemAsync('completedOnboarding', JSON.stringify(profile.completed_onboarding_response));
      } else {
        console.log('[profile context] profile loaded', profile);
        loadStorageData();

      }
    };

    const deleteLocalStorage = async (): Promise<void> => {
      console.log('[profile context] profile deleted', profile)
      await deleteItemAsync('profile');
      await deleteItemAsync('completedOnboarding');
    }


    updateLocalStorage(); // Update local storage whenever profile or completedOnboarding changes

    return () => {
      // Cleanup function
      deleteLocalStorage();
    };
  }, []);


  const fetchProfile = useCallback(async (userID: number): Promise<void> => {
    try {
      const fetchedProfile = await getProfile(userID.toString());
      console.log('[profile context] fetched profile', fetchedProfile);
      if (fetchedProfile) {
        setProfile(fetchedProfile);
        setCompletedOnboarding(fetchedProfile?.completed_onboarding_response)
        await setItemAsync('profile', JSON.stringify(fetchedProfile));
        await setItemAsync('completedOnboarding', JSON.stringify(fetchedProfile?.completed_onboarding_response || false))
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle error - show message or perform recovery action
    }
  }, []);

  const updateField = useCallback(
    async (
      field: 'name' | 'dateOfBirth' | 'phoneNumber',
      value: string | Date | number
    ): Promise<void> => {
      if (!profile) return;

      const updatedProfile: IProfile = { ...profile, [field]: value };
      setProfile(updatedProfile);

      try {
        await updateProfile(updatedProfile, profile.id);
        await setItemAsync('profile', JSON.stringify(updatedProfile));
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

      const updatedProfile: IProfile = {
        ...profile,
        onboarding_response: onboardingFlowState
      };

      try {
        console.log('[profile context] updated profile', updatedProfile)
        console.log('[profile context] updated profile profile id', profile.id)
        console.log('[profile context] updated profile user id', profile.user_id)

        const profileResponse = await insertOnboardingResponse(
          updatedProfile.onboarding_response,
          profile.id,
          profile.user_id
        );
        setProfile(profileResponse);
        await setItemAsync('profile', JSON.stringify(profileResponse));
      } catch (error) {
        console.error(`Error updating onboardingFlowState in profile:`, error);
        // Handle error - show message or perform recovery action
      }
    },
    [profile]
  );

  const toggleOnboarding = useCallback(async (): Promise<void> => {
    if (!profile) return;


    try {
      const profileRespnse = await updateOnboardingToComplete(profile.id);
      setCompletedOnboarding(true)
      await setItemAsync('profile', JSON.stringify(profileRespnse));
      await setItemAsync('completedOnboarding', JSON.stringify(true));
    } catch (error) {
      console.error(`Error setting onboarding to complete in profile:`, error);
      // Handle error - show message or perform recovery action
    }
  }, []);

  const loadStorageData = useCallback(async (): Promise<void> => {
    try {
      const profileSerialized = await getItemAsync('profile');
      const completedOnboardingSerialized = await getItemAsync('completedOnboarding');

      if (profileSerialized) {
        const loadedProfile: IProfile = JSON.parse(profileSerialized);
        setProfile(loadedProfile);
      }

      if (completedOnboardingSerialized) {
        const loadedCompletedOnboarding: boolean = JSON.parse(completedOnboardingSerialized);
        setCompletedOnboarding(loadedCompletedOnboarding);
      }
    } catch (error) {
      console.error('Error loading profile from storage:', error);
      // Handle error - show message or perform recovery action
    }
  }, []);

  const contextValue: ProfileContextData = {
    profile,
    setProfile,
    completedOnboarding,
    setCompletedOnboarding,
    completeOnboarding,
    toggleOnboarding,
    fetchProfile,
    updateField
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
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};
