import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

type RequireAuthProps = { children: JSX.Element };

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return children;
};
