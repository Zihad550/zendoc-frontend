import { IUser } from '../user';

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  address?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
