import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

type RequireGuestProps = { children: JSX.Element };

export const RequireGuest = ({ children }: RequireGuestProps) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/projects" />;

  return children;
};
