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

    console.log('GOT HERE')

    response.json().then((data) => {
        console.log('This is the USER returned by Login: ', data);
    }); 

    const data = await response.json();
    console.log("test", data);
};



const signUp = async (userInput: IUser) => {
    try {

        const response = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userInput.username,
                password: userInput.password,
                email: userInput.username,
                persona_id: userInput.persona_id,
                firebase_id: userInput.firebase_id
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('test', data);

        // this should probably be in the login function
        const profileResponse = await fetch(`http://localhost:8080/api/profiles/${data.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userInput.username.split('@')[0]
            }),
        });

        const profileData = await profileResponse.json();
        console.log('test', profileData);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

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