// export type ISchedule = {
//    [x: string]: any;
//    id?: string;
//    startDate: string;
//    endDate: string;

import { IAppointment } from "../appointment";
import { DoctorSchedule } from "../doctorSchedules";

// };
export interface ISchedule {
  id: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  doctorSchedules: DoctorSchedule[];
  appointment?: IAppointment;
}

export type IScheduleFrom = {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};
