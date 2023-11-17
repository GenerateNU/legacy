import axios from "axios";
import { IProfile } from "../interfaces/IProfile";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";

export const createProfile = async (
  user_id: string,
  name: string,
  phone_number: string,
  dob: Date
) => {
  const response = await axios.post(`http://localhost:8080/api/profiles/`, {
    body: JSON.stringify({
      name: name,
      date_of_birth: dob,
      phone_number: phone_number,
      user_id: user_id,
    }),
  });
  return response.data;
};

export const getProfile = async (user_id: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/users/${user_id}/profile`
  );

  return response.data as IProfile;
};

export const updateProfile = async (profile: IProfile, profile_id: number) => {
  const response = await axios.patch(
    `http://localhost:8080/api/profiles/${profile_id}`,
    {
      body: JSON.stringify({
        name: profile.name,
        date_of_birth: profile.dateOfBirth,
        phone_number: profile.phoneNumber,
        onboarding_response: profile.onboardingResponse,
        completed_onboarding_response: profile.completedOnboardingResponse,
        user_id: profile.userID,
      }),
    }
  );
};

export const insertOnboardingResponse = async (
  onboardingResponse: IOnboardingFlowState,
  profile_id: number,
  user_id: number
) => {
  console.log("onboardingResponse", onboardingResponse);
  console.log("profile_id", profile_id);
  console.log("user_id", user_id);

  const response = await axios.patch(
    `http://localhost:8080/api/profiles/response/${profile_id}/${user_id}`,
    {
      body: JSON.stringify({
        onboarding_response: onboardingResponse,
      }),
    }
  );

  return response.data;
};
