import { getCurrentUser } from "@/data/user";
import { User } from "@/interfaces/User";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | undefined;
  isLoading: boolean;
};

const initialState: AuthProviderState = {
  user: undefined,
  isLoading: false,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return (
    <AuthProviderContext.Provider value={{ user, isLoading: isPending }}>
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
