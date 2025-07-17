import { authKey } from "@/contants/authkey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "../services/actions/deleteCookies";

export const logoutUser = async (router: AppRouterInstance) => {
  await deleteCookies([authKey, "refreshToken"]);
  router.push("/");
  router.refresh();
};
