import { IModel } from "@/interfaces/IModel";

export interface IFile extends IModel {
  file_name: string;
  user_id: number;
  tags: string[];
}
