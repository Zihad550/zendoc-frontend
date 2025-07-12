import { authKey } from "@/contants/authkey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { setToLocalStorage } from "@/utils/local-storage";

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};
