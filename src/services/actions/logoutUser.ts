import { authKey } from "@/contants/authkey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

export const logoutUser = async (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  await deleteCookies([authKey, "refreshToken"]);
  router.push("/");
  router.refresh();
};
