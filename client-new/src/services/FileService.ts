import { IFile } from '@/interfaces/IFile';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';

export const getUserFilesList = async (userId: number): Promise<IFile[]> => {
  const response = await axios.get(`${API_BASE_URL}/files/${userId}/user`);
  return response.data;
  // return response.status === 200 ? response.data : [];
};