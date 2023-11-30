import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';

import { IProfile } from '@/interfaces/IProfile';
import { IUser } from '@/interfaces/IUser';

import { API_BASE_URL } from '@/services/const';

/**
 * Fetches a user from the API
 * @param userID the ID of the user to fetch
 * @returns the user [IUser]
 */
export const fetchUser = async (userID: number): Promise<AxiosResponse<IUser>> => {
  const response = await axios.get(`${API_BASE_URL}/users/${userID}`);
  console.log('[user service] fetching user', `${API_BASE_URL}/users/${userID}`, 'with status', response.status)
  return response;
}

export const fetchUserByFirebaseID = async (firebaseID: string): Promise<AxiosResponse<IUser>> => {
  const response = await axios.get(`${API_BASE_URL}/users/firebase/${firebaseID}`);
  console.log('[user service] fetching user by firebase id', `${API_BASE_URL}/users/firebase/${firebaseID}`, 'with status', response.status)
  return response;
}

export const fetchProfile = async (userID: number): Promise<AxiosResponse<IProfile>> => {
  const response = await axios.get(`${API_BASE_URL}/users/${userID}/profile`);
  console.log('[user service] fetching profile', `${API_BASE_URL}/users/${userID}/profile`, 'with status', response.status)
  return response;
}

export const fetchUserAndProfile = async (firebaseID: string): Promise<{
  user: AxiosResponse<IUser>;
  profile: AxiosResponse<IProfile>;
}> => {
  const user = await fetchUserByFirebaseID(firebaseID);
  console.log("USER", user.data);
  const profile = await fetchProfile(user.data.id);
  console.log("PROFILE", profile.data);
  return { user, profile };
};

export const createUserAndProfile = async (user: IUser) => {
  const newUser: AxiosResponse<IUser> = await axios.post(
    `${API_BASE_URL}/users/`,
    {
      username: user.username,
      password: user.password,
      email: user.email,
      firebase_id: user.firebase_id
    }
  ).catch((err) => {
    return err;
  });

  const _: AxiosResponse<IProfile> = await axios.post(
    `${API_BASE_URL}/profiles/`,
    {
      name: user.email.split('@')[0],
      date_of_birth: new Date(2000, 10, 7),
      phone_number: '123456789',
      user_id: newUser.data.id
    }
  ).catch((err) => {
    return err;
  });

  return newUser;
};

export const initalizeAllProgress = async (userID: number) => {
  console.log("INITIALIZING PROGRESS");
  await axios.post(`${API_BASE_URL}/users/${userID}/progress`).then((res) => console.log(res.data))
}