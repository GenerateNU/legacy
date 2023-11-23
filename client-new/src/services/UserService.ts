import axios, { AxiosResponse } from "axios";
import { IUser } from "../interfaces/IUser";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";
import { IProfile } from '../interfaces/IProfile';

const API_BASE_URL = "http://localhost:8080/api";

export const fetchUserAndProfile = async (firebaseID: string) => {
  const user = await axios.get(
    `${API_BASE_URL}/users/firebase/${firebaseID}`
  );

  const profile = await axios.get(
    `${API_BASE_URL}/profiles/user/${user.data.id}`
  );

  return { user, profile };
}

export const createUserAndProfile = async (user: IUser) => {
  const newUser: AxiosResponse<IUser> = await axios.post(
    `${API_BASE_URL}/users/`, {
      username: user.username,
      password: user.password,
      email: user.email,
      firebase_id: user.firebase_id,
    }
  );

  const _: AxiosResponse<IProfile> = await axios.post(
    `${API_BASE_URL}/profiles/`, {
      name: user.email.split("@")[0],
      date_of_birth: new Date(2000, 10, 7),
      phone_number: "123456789",
      user_id: newUser.data.id,
  });

  return { newUser };
}

export const sendOnboardingResponse = async (
  id: number,
  onboardingState: IOnboardingFlowState
) => {
  console.log("Reached onboarding endpoint");
  const data = await axios.patch(
    `http://localhost:8080/api/profiles/response/${id}`,
    {
      onboardingResponse: onboardingState,
    }
  );
  
  return data.status;
};

