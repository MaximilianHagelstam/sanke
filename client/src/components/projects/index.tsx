import { getProjects } from "@/data/project";
import { useQuery } from "@tanstack/react-query";

export const Projects = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending) return <h1>Loading...</h1>;

  if (isError) return <h1>Error</h1>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
