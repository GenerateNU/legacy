import { IActionList } from "./IAction";

export interface ISubTask {
    id: number;
    sub_task_name: string;
    sub_task_description: string;
    task_id: number;
    actions: IActionList;
    actions_state: string;
  }