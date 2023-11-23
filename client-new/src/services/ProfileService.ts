import axios from "axios";
import { IProfile } from "../interfaces/IProfile";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";

const API_BASE_URL = "http://localhost:8080/api/profiles";

export const createProfile = async (
  user_id: string,
  name: string,
  phone_number: string,
  dob: Date
): Promise<IProfile> => {
  const response = await axios.post(`${API_BASE_URL}/`, {
    name: name,
    date_of_birth: dob,
    phone_number: phone_number,
    user_id: user_id,
  });
  return response.data;
};

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
    date_of_birth: profile.dateOfBirth,
    phone_number: profile.phoneNumber,
    onboarding_response: profile.onboardingResponse,
    completed_onboarding_response: profile.completedOnboardingResponse,
    user_id: profile.userID,
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
