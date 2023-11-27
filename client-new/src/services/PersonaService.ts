import axios from 'axios';

import { IPersona } from '../interfaces/IPersona';
import { IUser } from '../interfaces/IUser';
import { API_BASE_URL } from '@/services/const';

export const fetchUserPersona = async (user_id: number): Promise<IPersona> => {
  const response = await axios.get(`${API_BASE_URL}/users/${user_id}/persona`);
  return response.data;
};
