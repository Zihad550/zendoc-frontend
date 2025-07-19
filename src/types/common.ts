import { USER_ROLE } from '@/contants/role';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<Record<any, any>, 'svg'>> & {
    muiName: string;
  };
  child?: DrawerItem[];
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export const Gender = ['MALE', 'FEMALE'];

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum BloodGroup {
  A_POSITIVE = 'A_POSITIVE',
  B_POSITIVE = 'B_POSITIVE',
  O_POSITIVE = 'O_POSITIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  O_NEGATIVE = 'O_NEGATIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  UNMARRIED = 'UNMARRIED',
}
