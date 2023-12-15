import { getCurrentUser } from "@/data/user";
import { User } from "@/interfaces/User";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
};

const initialState: AuthProviderState = {
  user: null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return (
    <AuthProviderContext.Provider
      {...props}
      value={{ user: data ? data : null }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};
