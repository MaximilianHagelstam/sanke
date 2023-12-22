import { getUserToken } from "@/lib/local-storage-helpers";
import { Project } from "../interfaces/Project";

const API_URL = import.meta.env.VITE_API_URL;

export const getProjects = async (): Promise<Project[]> => {
  const userToken = getUserToken();
  const res = await fetch(`${API_URL}/api/projects`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  if (!res.ok) throw new Error("Error fetching projects");

  const data = (await res.json()) as { projects: Project[] };
  return data.projects;
};

export const createProject = async (title: string): Promise<void> => {
  const userToken = getUserToken();
  const res = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Error creating project");
};

export const deleteProject = async (id: string): Promise<void> => {
  const userToken = getUserToken();
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  if (!res.ok) throw new Error("Error deleting project");
};

export const getProjectById = async (id: string): Promise<Project> => {
  const userToken = getUserToken();
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  if (!res.ok) throw new Error("Error fetching project");

  const data = (await res.json()) as { project: Project };
  return data.project;
};
