import { User } from "@/interfaces/User";
import { getUserToken, setUserToken } from "@/lib/local-storage-helpers";

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

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid username or password");

  const json = (await res.json()) as { token: string | null };
  if (!json.token) throw new Error("Invalid username or password");

  setUserToken(json.token);
};

export const register = async (
  username: string,
  password: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const { error } = (await res.json()) as { error: string };
  if (!res.ok) throw new Error(error);
};
