import { Skeleton } from "@/components/ui/skeleton";
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

  if (isError) return <h1>Error</h1>;

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">Projects</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Create and manage projects.
          </p>
        </div>
        <CreateProjectButton />
      </div>
      <div>
        {isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="grid items-center gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <div className="grid items-center gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <div className="grid items-center gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        ) : (
          <>
            {projects.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <NoProjectsPlaceHolder />
            )}
          </>
        )}
      </div>
    </div>
  );
};
