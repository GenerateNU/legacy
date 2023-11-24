import { IActionList } from './IAction';
import { IModel } from './IModel';

export interface ISubTask extends IModel{
  sub_task_name: string;
  sub_task_description: string;
  task_id: number;
  action: IActionList;
  action_state: string;
}
