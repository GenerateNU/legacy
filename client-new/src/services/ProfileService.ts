import axios from 'axios';

import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { IProfile } from '../interfaces/IProfile';
import { API_BASE_URL } from '@/services/const';

export const getProfile = async (user_id: string) => {
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
  console.log('onboardingResponse', onboardingResponse);
  console.log('profile_id', profile_id)
  console.log('user_id', user_id)
  const response = await axios.patch(
    `${API_BASE_URL}/profiles/response/${profile_id}/${user_id}`,
    onboardingResponse
  );
  return response.data;
};
