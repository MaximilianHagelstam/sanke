import { useAuth } from "@/providers/auth-provider";
import { Navigate } from "react-router-dom";

type RequireAuthProps = { children: JSX.Element };

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) return <Navigate to="/" />;

  return children;
};
