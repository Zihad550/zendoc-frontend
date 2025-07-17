"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { logout, selectToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decodedToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) {
      try {
        // This will throw an error if the token is invalid or expired
        decodedToken(token);
      } catch {
        // If token is invalid, clear state and redirect
        dispatch(logout());
        router.push("/");
      }
    } else {
      // If there's no token at all, ensure state is clean and redirect
      dispatch(logout());
      router.push("/");
    }
  }, [token, dispatch, router]);

  // If there's no token, the useEffect will trigger a redirect.
  // Render a spinner to avoid flashing the dashboard content.
  if (!token) {
    return <Spinner />;
  }

  // If a valid token exists, render the main dashboard layout.
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
