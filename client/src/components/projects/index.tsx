import { getProjects } from "@/data/project";
import { useQuery } from "@tanstack/react-query";
import { CreateProjectButton } from "./create-project-button";
import { NoProjectsPlaceHolder } from "./no-projects-placeholder";
import { ProjectItem } from "./project-item";

export const Projects = () => {
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending) return <h1>Loading...</h1>;

  if (isError) return <h1>Error</h1>;

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold md:text-4xl">Projects</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Create and manage projects.
          </p>
        </div>
        <CreateProjectButton />
      </div>
      <div>
        {projects.length ? (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <NoProjectsPlaceHolder />
        )}
      </div>
    </div>
  );
};
