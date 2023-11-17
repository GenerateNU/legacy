import axios from 'axios';
import { IGuide } from '../interfaces/IGuide';
import { ENDPOINT } from './const';

export const getGuide = (guideName: string): Promise<IGuide> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get<IGuide>(`${ENDPOINT}/api/guides/${guideName}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  });
};
