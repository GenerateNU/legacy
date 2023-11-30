

import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { IProfile } from '../interfaces/IProfile';
import { API_BASE_URL } from '@/services/const';
import axios from "axios";
import {IPersona} from "../interfaces/IPersona";

export const getProfile = async (user_id: string) => {
  console.log('[profile service] fetching profile', `${API_BASE_URL}/users/${user_id}/profile`)
  const response = await axios.get(`${API_BASE_URL}/users/${user_id}/profile`);
  return response.data as IProfile;
};

export const updateProfile = async (
  profile: IProfile,
  profile_id: number
): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/profiles/${profile_id}`, {
    name: profile.name,
    date_of_birth: profile.date_of_birth,
    phone_number: profile.phone_number,
    onboarding_response: profile.onboarding_response,
    completed_onboarding_response: profile.completed_onboarding_response,
    user_id: profile.user_id
  });
};

export const insertOnboardingResponse = async (
  onboardingResponse: IOnboardingFlowState,
  profile_id: number,
  user_id: number
): Promise<IProfile> => {
  const response = await axios.patch(`${API_BASE_URL}/profiles/response/${profile_id}/${user_id}`,
    onboardingResponse
  );
  return response.data;
};

export const updateOnboardingToComplete = async (
  profile_id: number,
): Promise<IProfile> => {
  console.log('[profile service] updating onboarding to complete', `${API_BASE_URL}/profiles/complete/${profile_id}`)
  const response = await axios.patch(`${API_BASE_URL}/profiles/complete/${profile_id}`);
  return response.data;
}

/**
 * Gets all the personas from the backend
 * @returns a list of personas
 */
export const getAllPersonas = async (): Promise<IPersona[]> => {
  try {
    const response = await axios.get<IPersona[]>(
      `http://localhost:8080/api/personas/`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Gets the persona of the user with the given id
 * @param userID id for some user
 * @returns persona
 */
export const getPersona = async (userID: string): Promise<IPersona> => {
  try {
    const response = await axios.get<IPersona>(
      `http://localhost:8080/api/personas/${userID}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
