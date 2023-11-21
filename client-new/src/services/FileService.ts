import { IFile } from "@/interfaces/IFile";
import axios from "axios";
import { ENDPOINT } from "./const";

export const getUserFilesList = (userId: number): Promise<IFile[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get<IFile[]>(`${ENDPOINT}/api/files/${userId}/user`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    });
  };