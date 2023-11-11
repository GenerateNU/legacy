import axios from "axios";
import { IAction, IActionList } from "@/interfaces/IAction";

export const getAction = (subTaskId: string): Promise<IActionList> => {
    console.log("getAction", subTaskId);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get<IActionList>(`http://localhost:8080/api/subtasks/${subTaskId}/action`)
        .then((res) => {
            console.log(res);
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  });
};