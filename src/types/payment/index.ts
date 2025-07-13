import { IAppointment, PaymentStatus } from "../appointment";

export interface IPayment {
  id: string;
  appointmentId: string;
  appointment: IAppointment;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentGatewayData?: unknown; // JSON
  createdAt: Date;
  updatedAt: Date;
}
