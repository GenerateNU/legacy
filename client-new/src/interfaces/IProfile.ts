import { IModel } from "./IModel";
import { IOnboardingFlowState } from "./IOnboardingFlowState";

export interface IProfile extends IModel {
  name: string;
  dateOfBirth: Date;
  phoneNumber: number;
  onboardingResponse: IOnboardingFlowState;
  completedOnboardingResponse: boolean;
  userID: number;
}
