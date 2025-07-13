import { IReview } from "../review";

export interface Doctor {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  review: IReview[];
  doctorSpecialties: DoctorSpecialty[];
}

export interface DoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: ISpecialties; // You may want to specify the structure of the specialties object if known
}

export interface ISpecialties {
  id: string;
  title: string;
  icon: string;
}
