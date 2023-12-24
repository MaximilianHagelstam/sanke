import { ErrorPage } from "@/components/error-page";
import { getProjectById } from "@/data/project";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectBoard = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

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

  if (isPending) return <h1>Loading...</h1>;

  if (isError)
    return (
      <ErrorPage
        title="404"
        description="The project you are looking for doesn't exist."
        buttonText="Go Back"
        onClick={() => navigate("/projects")}
      />
    );

  return <pre>{JSON.stringify(project, null, 2)}</pre>;
};
