import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { IOnboardingFlowState } from "../interfaces/IOnboardingFlowState";
import { Persona } from "../types/Persona";

// SHOULD AXIOS BE BEING USED AND IF SO, AM I DOING IT PROPERLY

export const signIn = async (email: string, password: string, uid: string) => {
  // CHECK ROUTE HERE
  const response = await fetch(
    `http://localhost:8080/api/users/firebase/${uid}`
  );

  response.json().then((data) => {
    console.log("This is the USER returned by Login: ", data);
  });

  const profileResponse = await fetch(
    `http://localhost:8080/api/profiles/user/${data.id}`
  );

  profileResponse.json().then((data) => {
    console.log("This is the corresponding PROFILE returned by Login: ", data);
  });
};

export const signUp = async (userInput: IUser) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInput.username,
        password: userInput.password,
        email: userInput.email,
        firebase_id: userInput.firebase_id,
      }),
    });

    if (!response.ok) {
      console.log("api response", response);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("user id is ", data.id);

    // this should probably be in the login function
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
        user_id: data.id
      }),
    });

    const profileData = await profileResponse.json();
    console.log("test", profileData);
    return profileData.completed_onboarding_response
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const sendOnboardingResponse = async (
  id: number,
  onboardingState: IOnboardingFlowState
) => {
  const data = await axios.post(
    `http://localhost:8081/api/profiles/response/${id}`,
    {
      onboardingResponse: onboardingState,
    }
  );

  return data.status;
};

export const getPersona = async (id: number) => {
  const data = (await axios
    .post(`http://localhost:8081/api/personas/${id}`)
    .then((res) => {
      res.data;
    })) as Persona;

  return data;
};
