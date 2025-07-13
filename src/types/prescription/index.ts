import { IAppointment } from "../appointment";
import { Doctor } from "../doctor";
import { IPatient } from "../patient";

export interface IPrescription {
  id: string;
  appointmentId: string;
  appointment: IAppointment;
  doctorId: string;
  doctor: Doctor;
  patientId: string;
  patient: IPatient;
  instructions: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
