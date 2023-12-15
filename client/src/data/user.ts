import { User } from "@/interfaces/User";
import { getUserToken } from "@/lib/local-storage-helpers";

const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async (): Promise<User> => {
  const userToken = getUserToken();
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  if (!res.ok) throw new Error("Error fetching user");

  const user = (await res.json()) as User | null;
  if (!user) throw new Error("Error fetching user");

  return user;
};
