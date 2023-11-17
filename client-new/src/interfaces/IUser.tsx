import { IModel } from "./IModel";

export interface IUser extends IModel {
  username: string;
  email: string;
  password: string;
  persona_id?: number;
  firebase_id: string;
}
