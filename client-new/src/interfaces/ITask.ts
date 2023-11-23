import { IModel } from './IModel';

export interface ITask extends IModel {
    taskDescription: string;
    taskTitle: string;
}