import axios from "axios";
import { IPersona } from "../interfaces/IPersona";


/**
 * Gets all the personas from the backend
 * @returns a list of personas
 */
export const getAllPersonas = async (): Promise<IPersona[]> => {
  try {
    const response = await axios.get<IPersona[]>(`http://localhost:8080/api/personas`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


/**
 * Gets the persona of the user with the given id
 * @param userID id for some user
 * @returns persona 
 */
export const getPersona = async (userID: string): Promise<IPersona> => {
  try {
    const response = await axios.get<IPersona>(`http://localhost:8080/api/personas/${userID}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};