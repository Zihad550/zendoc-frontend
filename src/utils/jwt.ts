import { IAuthUser } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  return jwtDecode(token) as IAuthUser;
};
