import { getProjectById } from "@/data/project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const ProjectBoard = () => {
  const { id } = useParams() as { id: string };

  const {
    data: project,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const data = await getProjectById(id);
      return data;
    },
  });

  if (isError) return <h1>Error</h1>;
  if (isPending) return <h1>Loading...</h1>;

  return <pre>{JSON.stringify(project, null, 2)}</pre>;
};
