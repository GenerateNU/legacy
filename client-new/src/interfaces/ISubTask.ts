import { IActionList } from "./IAction";

export interface ISubTask {
    task_name: string;
    task_description: string;
    task_id: number;
    action: IActionList;
    action_state: string;
  }