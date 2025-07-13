import { IAppointment } from "../appointment";
import { BloodGroup, GenderEnum, MaritalStatus } from "../common";
import { IPrescription } from "../prescription";
import { IReview } from "../review";
import { IUser } from "../user";

export interface IPatient {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  patientHealthData?: IPatientHealthData;
  medicalReport: IMedicalReport[];
  appointment: IAppointment[];
  prescription: IPrescription[];
  review: IReview[];
}

export interface IPatientHealthData {
  id: string;
  patientId: string;
  patient: IPatient;
  gender: GenderEnum;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  hasAllergies?: boolean;
  hasDiabetes?: boolean;
  height: string;
  weight: string;
  smokingStatus?: boolean;
  dietaryPreferences?: string;
  pregnancyStatus?: boolean;
  mentalHealthHistory?: string;
  immunizationStatus?: string;
  hasPastSurgeries?: boolean;
  recentAnxiety?: boolean;
  recentDepression?: boolean;
  maritalStatus: MaritalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMedicalReport {
  id: string;
  patientId: string;
  patient: IPatient;
  reportName: string;
  reportLink: string;
  createdAt: Date;
  updatedAt: Date;
}
