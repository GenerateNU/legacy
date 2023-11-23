import axios, { AxiosResponse } from "axios";
import { IUser } from "../interfaces/IUser";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";

export const signIn = async (email: string, password: string, uid: string) => {
  // CHECK ROUTE HERE
  const response = await fetch(
    `http://localhost:8080/api/users/firebase/${uid}`
  );

  response.json().then((data) => {
    console.log('This is the USER returned by Login: ', data);
  });

  const profileResponse = await fetch(
    `http://localhost:8080/api/profiles/user/${uid}`
  );

  profileResponse.json().then((data) => {
    console.log("This is the corresponding PROFILE returned by Login: ", data);
  });
};

export const signUp = async (userInput: IUser) => {
  try {
    // maybe it's own service
    const response = await fetch("http://localhost:8080/api/users/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInput.username,
        password: userInput.password,
        email: userInput.username,
        persona_id: userInput.persona_id,
        firebase_id: userInput.firebase_id
      })
    });

    if (!response.ok) {
      console.log('api response', response);
      throw new Error('Network response was not ok');
    }

    const user: IUser = await response.json();
    // TODO: validation https://zod.dev/
    console.log("user id is ", user.id);

    // maybe it's own service
    const profileResponse = await fetch(`http://localhost:8080/api/profiles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInput.email.split("@")[0],

        //TODO: figure out if we want fields to be required. This is dummy data for testing purposes
        date_of_birth: new Date(2000, 10, 7),
        phone_number: "123456789",
        user_id: user.id,
      }),
    });

    const profile = await profileResponse.json();
    console.log("test", profile);
    return user;
  } catch (error) {
    console.log('Error:', error.message);
  }
};

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

  console.log("The result is: ", data);

  return data.status;
};

export const getPersonaFromOnboardingResponse = async (
  userID: number,
  onboardingState: IOnboardingFlowState
): Promise<Persona> => {
  const response: AxiosResponse<Persona> = await axios.get(
    `http://localhost:8080/api/personas/calculate`,
    {
      params: {
        userID: userID,
        onboardingResponse: onboardingState,
      },
    }
  );

  return response.data;
};
