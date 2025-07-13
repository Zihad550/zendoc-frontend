import { authKey } from "@/contants/authkey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage } from "@/utils/local-storage";
import { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";

const useUserInfo = (): any | string => {
  const [userInfo, setUserInfo] = useState<any | string>("");

  useEffect(() => {
    const fetchUserInfo = () => {
      try {
        const authToken = getFromLocalStorage(authKey);
        console.log(authToken);
        if (authToken) {
          const decodedData: JwtPayload & { role: any } = decodedToken(
            authToken,
          ) as JwtPayload & {
            role: any;
          };
          const userInfo: any = {
            ...decodedData,
            role: decodedData.role?.toLowerCase() || "",
          };
          setUserInfo(userInfo);
        } else {
          setUserInfo("");
        }
      } catch {
        setUserInfo("");
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
