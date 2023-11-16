import axios from "axios";
import { IAction, IActionList } from "@/interfaces/IAction";
import { ENDPOINT } from "./const";

export const getAction = (subtask_id: number): Promise<IActionList> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get<IActionList>(`${ENDPOINT}/api/subtasks/${subtask_id}/action`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  });
};