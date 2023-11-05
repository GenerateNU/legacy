import axios from "axios";
import { IGuide } from "../interfaces/IGuide";

export const getGuide = (guideName: string): Promise<IGuide> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get<IGuide>(`http://localhost:8080/api/guides/${guideName}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  });
};
