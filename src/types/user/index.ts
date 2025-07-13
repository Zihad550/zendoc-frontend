import { IAdmin } from "../admin";
import { UserRole } from "../common";
import { Doctor } from "../doctor";
import { IPatient } from "../patient";

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  admin?: IAdmin;
  doctor?: Doctor;
  patient?: IPatient;
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}
