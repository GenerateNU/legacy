import axios from 'axios';

import { IPersona } from '../interfaces/IPersona';
import { IUser } from '../interfaces/IUser';

export const getPersona = async (user_id: number) => {
  const response = await axios.get(
    `http://localhost:8080/api/users/${user_id}/persona`
  );

  return response.data as IPersona;
};
