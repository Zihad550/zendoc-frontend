import { IAppointment } from "../appointment";
import { Doctor } from "../doctor";
import { IPatient } from "../patient";

export interface IReview {
  id: string;
  patientId: string;
  patient: IPatient;
  doctorId: string;
  doctor: Doctor;
  appointmentId: string;
  appointment: IAppointment;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
