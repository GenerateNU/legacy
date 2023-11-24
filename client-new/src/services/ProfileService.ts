import axios from 'axios';

import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { IProfile } from '../interfaces/IProfile';

const API_BASE_URL = 'http://localhost:8080/api/profiles';

export const getProfile = async (user_id: string): Promise<IProfile> => {
  const response = await axios.get(`${API_BASE_URL}/${user_id}`);
  return response.data;
};

export const updateProfile = async (
  profile: IProfile,
  profile_id: number
): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${profile_id}`, {
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
  const response = await axios.patch(
    `${API_BASE_URL}/response/${profile_id}/${user_id}`,
    onboardingResponse
  );
  return response.data;
};
