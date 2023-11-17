import { IModel } from "./IModel";

export interface IProfile extends IModel {
  name: string;
  dateOfBirth: Date;
  phoneNumber: number;
  onboardingResponse: JSON;
  completedOnboardingResponse: boolean;
  userID: number;
}
