import { Doctor } from "../doctor";
import { DoctorSchedule } from "../doctorSchedules";
import { IPatient } from "../patient";
import { IPayment } from "../payment";
import { IPrescription } from "../prescription";
import { IReview } from "../review";
import { ISchedule } from "../schedule";

export interface IAppointment {
  id: string;
  patientId: string;
  patient: IPatient;
  doctorId: string;
  doctor: Doctor;
  scheduleId: string;
  schedule: ISchedule;
  videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  doctorSchedules?: DoctorSchedule;
  payment?: IPayment;
  prescription?: IPrescription;
  review?: IReview;
}

export enum AppointmentStatus {
  SCHEDULED = "SCHEDULED",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
