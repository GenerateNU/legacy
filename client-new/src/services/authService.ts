import axios from 'axios';
import { IUser } from '../interfaces/IUser';
import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { Persona } from '../types/Persona';

// SHOULD AXIOS BE BEING USED AND IF SO, AM I DOING IT PROPERLY


const signIn = async (email: string, password: string, uid: string) => {
    // CHECK ROUTE HERE
    const response = await fetch(
        `http://localhost:8081/api/users/firebase/${uid}`
    );

    response.json().then((data) => {
        console.log(data);
    });

    const data = await response.json();
    console.log("test", data);
};




// RUN THE ENTIRE ROUTE BY AKSHAY HERE, NOT FAMILIAR WITH AXIOS WELL ENOUGH
const signUp = async (userInput: IUser) => {

    const { data, status } = await axios.post(`http://localhost:8081/api/progress/${userInput.persona_id}`, {
        ...userInput
    })
    if (!(status >= 200 && status < 300)) {
        throw new Error("Network response was not ok");
    }
    const info = await data.json();
    const profileData = createProfile(info.id, data.user.email.split("@")[0]);
}

const createProfile = async (id: number, name: string) => {
    const { data } = await axios.post(`http://localhost:8081/api/profiles/${id}`, {
        name: name
    })
    const profileData = await data.json();
    return profileData;
};

export const sendOnboardingResponse = async (id: number, onboardingState: IOnboardingFlowState) => {
    const data = await axios.post(`http://localhost:8081/api/profiles/response/${id}`, {
        onboardingResponse: onboardingState
    })

    return data.status;

}

export const getPersona = async (id: number) => {
    const data = await axios.post(`http://localhost:8081/api/personas/${id}`)
        .then((res) => { res.data }) as Persona

    return data
}


export const authService = {
    signIn,
    signUp
};