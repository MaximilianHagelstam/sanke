import { useAuth } from "@/providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) return <Navigate to="/" />;

  return <Outlet />;
};
